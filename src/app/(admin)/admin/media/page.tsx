'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image, Upload, Trash2, Eye, FileText, Film, HardDrive } from 'lucide-react';
import { StatCard } from '@/features/admin/components/StatCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const media = [
  { id: 1, name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', uploaded: '2024-01-15' },
  { id: 2, name: 'course-intro.mp4', type: 'video', size: '45.2 MB', uploaded: '2024-01-14' },
  { id: 3, name: 'curriculum.pdf', type: 'pdf', size: '1.1 MB', uploaded: '2024-01-13' },
  { id: 4, name: 'logo-dark.png', type: 'image', size: '0.8 MB', uploaded: '2024-01-12' },
  { id: 5, name: 'certificate-template.pdf', type: 'pdf', size: '3.2 MB', uploaded: '2024-01-11' },
];

const typeIcons = {
  image: <Image size={14} className="text-primary" />,
  video: <Film size={14} className="text-destructive" />,
  pdf: <FileText size={14} className="text-warning" />,
};

export default function AdminMediaPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <span className="font-overline text-primary mb-2 block">Content</span>
          <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-1 font-body">Manage uploaded files and media assets.</p>
        </div>
        <Button variant="primary" icon={<Upload size={14} />}>Upload</Button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Files" value="234" icon={<Image size={18} />} color="primary" />
        <StatCard title="Storage Used" value="2.4 GB" icon={<HardDrive size={18} />} color="info" />
        <StatCard title="Images" value="156" icon={<Image size={18} />} color="success" />
        <StatCard title="Videos" value="23" icon={<Film size={18} />} color="destructive" />
      </motion.div>

      <motion.div variants={item}>
        <Card variant="elevated" className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {media.map((m) => (
                <tr key={m.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {typeIcons[m.type as keyof typeof typeIcons]}
                      <span className="text-sm font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge variant="outline" size="sm" className="uppercase">{m.type}</Badge></td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{m.size}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{m.uploaded}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Eye size={12} /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
