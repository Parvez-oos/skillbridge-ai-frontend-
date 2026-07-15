'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { loginSchema, LoginFormData } from '@/features/auth/validation';
import { OAuthButtons } from '@/features/auth/components/OAuthButtons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

const DEMO_EMAIL = 'demo@skillbridge.ai';
const DEMO_PASSWORD = 'Demo1234';

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleDemoLogin = async () => {
    try {
      setDemoLoading(true);
      setServerError(null);
      setValue('email', DEMO_EMAIL);
      setValue('password', DEMO_PASSWORD);
      await login(DEMO_EMAIL, DEMO_PASSWORD);
      router.push('/dashboard');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Demo login failed. Please try again.');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 30% 50%, var(--primary) 0%, transparent 50%)',
        opacity: 0.05,
      }} />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-2xl mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">SkillBridge</span>
            <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">AI</span>
          </Link>
          <span className="font-overline text-primary mb-2 block">Welcome Back</span>
          <h1 className="text-3xl font-heading tracking-tight text-foreground">Sign in to your account</h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">Continue your learning journey</p>
        </div>

        <div className="glass-strong rounded-2xl border border-border/50 p-8 shadow-2xl shadow-primary/5">
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {serverError}
            </div>
          )}

          <OAuthButtons mode="login" disabled={isLoading || demoLoading} />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/90 px-3 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/30"
            onClick={handleDemoLogin}
            loading={demoLoading}
            disabled={isLoading}
          >
            <Zap className="w-4 h-4 text-primary" />
            {demoLoading ? 'Signing in...' : 'Try Demo Account'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/90 px-3 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={errors.email ? 'border-destructive' : ''}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={errors.password ? 'border-destructive' : ''}
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              loading={isLoading}
              disabled={demoLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
