'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Settings, Shield, Mail, Palette, Globe, Database, Server, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success('Settings saved');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <span className="font-overline text-primary mb-2 block">System</span>
        <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 font-body">Configure your platform settings.</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card variant="elevated" className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Name</label>
                    <Input defaultValue="SkillBridge AI" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Support Email</label>
                    <Input defaultValue="support@skillbridge.ai" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform Description</label>
                  <Input defaultValue="AI-Powered Learning & Career Platform" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={saving}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card variant="elevated" className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Authentication and access control</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Badge variant="warning" size="sm">Coming Soon</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Input defaultValue="30" className="w-20 h-9 text-xs text-center" />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                  <div>
                    <p className="text-sm font-medium">Rate Limiting</p>
                    <p className="text-xs text-muted-foreground">API request limits per IP</p>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card variant="elevated" className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>SMTP and notification configuration</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP Host</label>
                    <Input placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP Port</label>
                    <Input placeholder="587" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP User</label>
                    <Input placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={saving}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card variant="elevated" className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Third-party service configuration</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {[
                  { name: 'Google OAuth', status: 'Connected', color: 'success' as const },
                  { name: 'GitHub OAuth', status: 'Connected', color: 'success' as const },
                  { name: 'Facebook OAuth', status: 'Connected', color: 'success' as const },
                  { name: 'Cloudinary', status: 'Connected', color: 'success' as const },
                  { name: 'Stripe', status: 'Not configured', color: 'secondary' as const },
                  { name: 'SendGrid', status: 'Not configured', color: 'secondary' as const },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                    <p className="text-sm font-medium">{integration.name}</p>
                    <Badge variant={integration.color} size="sm">{integration.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
