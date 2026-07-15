'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, var(--primary) 0%, transparent 50%)',
        opacity: 0.04,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative text-center max-w-lg"
      >
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter gradient-text select-none"
          >
            404
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 font-heading">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed font-body">
            The page you are looking for does not exist or has been moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/">
            <Button size="lg" className="btn-glow gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <span className="w-1 h-1 rounded-full bg-border" />
          <Link href="/learning-paths" className="hover:text-primary transition-colors">Learning Paths</Link>
          <span className="w-1 h-1 rounded-full bg-border" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
