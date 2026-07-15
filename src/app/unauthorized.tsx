import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        You do not have permission to access this page. Please log in with an authorized account.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Log In</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </Container>
  );
}
