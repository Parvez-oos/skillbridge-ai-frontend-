'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OAuthCallbackContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const provider = searchParams.get('provider') || searchParams.get('state');
    const code = searchParams.get('code');
    const accessToken = searchParams.get('access_token');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      window.opener?.postMessage(
        { type: 'OAUTH_ERROR', provider, error: errorDescription || error },
        window.location.origin
      );
      window.close();
      return;
    }

    const token = code || accessToken;

    if (provider && token) {
      window.opener?.postMessage(
        { type: 'OAUTH_SUCCESS', provider, token },
        window.location.origin
      );
      window.close();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-muted-foreground">Completing sign in...</p>
          </div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
