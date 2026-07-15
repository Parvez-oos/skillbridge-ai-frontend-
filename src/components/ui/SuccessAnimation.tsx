'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, PartyPopper } from 'lucide-react';

interface SuccessAnimationProps {
  title: string;
  description?: string;
  showConfetti?: boolean;
}

export function SuccessAnimation({ title, description, showConfetti = true }: SuccessAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {showConfetti && (
        <div className="relative mb-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: Math.cos((i * 30 * Math.PI) / 180) * 60,
                y: Math.sin((i * 30 * Math.PI) / 180) * 60,
              }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#6366F1', '#22C55E', '#EAB308', '#EF4444', '#3B82F6', '#EC4899'][i % 6],
              }}
            />
          ))}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 className="w-16 h-16 text-success" />
          </motion.div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-2 font-heading">{title}</h3>
        {description && (
          <p className="text-muted-foreground font-body">{description}</p>
        )}
      </motion.div>
    </div>
  );
}
