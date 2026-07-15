'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

type OAuthProvider = 'google' | 'github' | 'facebook';

const PROVIDER_CONFIG: Record<OAuthProvider, {
  label: string;
  url: string;
  icon: React.ReactNode;
}> = {
  google: {
    label: 'Continue with Google',
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  github: {
    label: 'Continue with GitHub',
    url: 'https://github.com/login/oauth/authorize',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  facebook: {
    label: 'Continue with Facebook',
    url: 'https://www.facebook.com/v18.0/dialog/oauth',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
};

function getOAuthUrl(provider: OAuthProvider): string {
  const config = PROVIDER_CONFIG[provider];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const redirectUri = `${appUrl}/auth/callback`;

  const commonParams = new URLSearchParams({
    redirect_uri: redirectUri,
    state: provider,
  });

  switch (provider) {
    case 'google':
      commonParams.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
      commonParams.set('response_type', 'code');
      commonParams.set('scope', 'openid email profile');
      commonParams.set('prompt', 'select_account');
      break;
    case 'github':
      commonParams.set('client_id', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '');
      commonParams.set('scope', 'user:email');
      break;
    case 'facebook':
      commonParams.set('client_id', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '');
      commonParams.set('response_type', 'code');
      commonParams.set('scope', 'email');
      break;
  }

  return `${config.url}?${commonParams.toString()}`;
}

interface OAuthButtonsProps {
  mode?: 'login' | 'register';
  disabled?: boolean;
}

export function OAuthButtons({ mode = 'login', disabled = false }: OAuthButtonsProps) {
  const { googleLogin, githubLogin, facebookLogin } = useAuth();
  const router = useRouter();
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);
  const popupRef = useRef<Window | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOAuthMessage = useCallback(async (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;

    const { type, provider, token, error } = event.data;

    if (type === 'OAUTH_SUCCESS') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      try {
        switch (provider as OAuthProvider) {
          case 'google':
            await googleLogin(token);
            break;
          case 'github':
            await githubLogin(token);
            break;
          case 'facebook':
            await facebookLogin(token);
            break;
        }
        toast.success(`${provider} sign in successful!`);
        router.push('/dashboard');
      } catch (err) {
        const message = err instanceof Error ? err.message : `${provider} sign in failed`;
        toast.error(message);
      } finally {
        setLoadingProvider(null);
      }
    } else if (type === 'OAUTH_ERROR') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      toast.error(error || `${provider} sign in was cancelled`);
      setLoadingProvider(null);
    }
  }, [googleLogin, githubLogin, facebookLogin, router]);

  useEffect(() => {
    window.addEventListener('message', handleOAuthMessage);
    return () => {
      window.removeEventListener('message', handleOAuthMessage);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleOAuthMessage]);

  const handleOAuthClick = (provider: OAuthProvider) => {
    setLoadingProvider(provider);

    const url = getOAuthUrl(provider);
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    popupRef.current = window.open(
      url,
      `oauth_${provider}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );

    timeoutRef.current = setTimeout(() => {
      if (popupRef.current?.closed === false) {
        toast.error('Sign in timed out. Please try again.');
        setLoadingProvider(null);
      }
    }, 120000);
  };

  return (
    <div className="flex flex-col gap-3">
      {(Object.keys(PROVIDER_CONFIG) as OAuthProvider[]).map((provider) => {
        const config = PROVIDER_CONFIG[provider];
        const isLoading = loadingProvider === provider;
        const isAnyLoading = loadingProvider !== null;

        return (
          <Button
            key={provider}
            type="button"
            variant="outline"
            className="w-full gap-2 h-11 rounded-xl hover:bg-muted/50"
            disabled={disabled || isAnyLoading}
            loading={isLoading}
            icon={!isLoading ? config.icon : undefined}
            onClick={() => handleOAuthClick(provider)}
          >
            <span>{config.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
