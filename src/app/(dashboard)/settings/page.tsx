'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Check, Palette, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  return (
    <Container>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 py-8"
      >
        <motion.div variants={item}>
          <span className="font-overline text-primary mb-2 block">Settings</span>
          <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1 font-body">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 shrink-0">
            <div className="flex flex-row lg:flex-col gap-1 bg-muted/30 p-1.5 rounded-2xl border border-border/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ripple',
                    activeTab === tab.id
                      ? 'bg-card text-foreground shadow-sm border border-border/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h2 className="text-lg font-semibold mb-5 font-heading">Profile Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <Input defaultValue={user?.name} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input type="email" defaultValue={user?.email} disabled />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Avatar URL</label>
                    <Input type="url" defaultValue={user?.avatar} placeholder="https://example.com/avatar.jpg" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleSave} loading={isSaving} className="btn-glow">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h2 className="text-lg font-semibold mb-5 font-heading">Notification Settings</h2>

                <div className="space-y-3">
                  {[
                    { label: 'Email Notifications', description: 'Receive email updates about your learning', defaultChecked: true },
                    { label: 'Weekly Progress Report', description: 'Get a weekly summary of your progress', defaultChecked: true },
                    { label: 'New Learning Paths', description: 'Notify when new paths match your interests', defaultChecked: false },
                    { label: 'Achievement Notifications', description: 'Celebrate your learning milestones', defaultChecked: true },
                  ].map((item, index) => (
                    <label key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/30 cursor-pointer hover:bg-muted/50 transition-colors ripple">
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={item.defaultChecked}
                        />
                        <div className="w-10 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-background rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleSave} loading={isSaving} className="btn-glow">
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h2 className="text-lg font-semibold mb-5 font-heading">Security Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleSave} loading={isSaving} className="btn-glow">
                    Update Password
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h2 className="text-lg font-semibold mb-5 font-heading">Appearance</h2>
                <p className="text-muted-foreground text-sm mb-4 font-body">
                  Customize the look and feel of the application.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Dark', 'Light', 'Midnight Blue', 'Emerald', 'Royal Purple'].map((theme) => (
                    <button
                      key={theme}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all duration-200 hover-glow',
                        theme === 'Dark' ? 'border-primary bg-primary/5' : 'border-border/50 bg-muted/30 hover:bg-muted/50'
                      )}
                    >
                      <div className="w-full h-8 rounded-lg bg-gradient-to-br from-background to-muted mb-2 border border-border/50" />
                      <p className="text-sm font-medium">{theme}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h2 className="text-lg font-semibold mb-5 font-heading">Language & Region</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                    <select className="w-full h-10 rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm text-foreground">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                    <select className="w-full h-10 rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm text-foreground">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                      <option>CET</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={handleSave} loading={isSaving} className="btn-glow">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
}
