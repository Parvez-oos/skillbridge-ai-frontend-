'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <h2 className="text-xl font-semibold mb-2">Error</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        An unexpected error occurred. Please try again later.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </Container>
  );
}
