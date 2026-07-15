'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <Section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <Container>
        <div className="py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Newsletter
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Updated</h2>
          <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on AI-powered learning
            and career development.
          </p>

          {isSubscribed ? (
            <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm border border-white/20 max-w-md mx-auto">
              <p className="text-lg font-medium">
                Thanks for subscribing! Check your email to confirm.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
