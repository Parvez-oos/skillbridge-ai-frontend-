'use client';

import { useProfile, useProfileStats, useProfileActivity } from '@/features/profile/hooks/useProfile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Edit,
  Globe,
  MapPin,
  Clock,
  Bookmark,
  FileText,
  Share2,
  Download,
} from 'lucide-react';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ProfilePage() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: stats, isLoading: statsLoading } = useProfileStats();
  const { data: activity, isLoading: activityLoading } = useProfileActivity();

  if (profileLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 rounded-2xl border border-border/50 bg-card/50">
          <User className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Profile Header */}
        <motion.div variants={item} className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl font-bold text-primary overflow-hidden border-4 border-background shadow-xl">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-success border-4 border-background flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1.5 font-body">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1 font-body">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                      {profile.role}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Level 8
                    </Badge>
                  </div>
                </div>

                <Link href="/profile/edit">
                  <Button className="btn-glow">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              {profile.bio && (
                <p className="mt-4 text-muted-foreground leading-relaxed font-body">{profile.bio}</p>
              )}

              <div className="flex gap-3 mt-4">
                {profile.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2]">
                      <LinkedinIcon className="w-4 h-4" />
                    </Button>
                  </a>
                )}
                {profile.socialLinks?.github && (
                  <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="hover:bg-foreground/10 hover:border-foreground/30">
                      <GithubIcon className="w-4 h-4" />
                    </Button>
                  </a>
                )}
                {profile.socialLinks?.twitter && (
                  <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2]">
                      <TwitterIcon className="w-4 h-4" />
                    </Button>
                  </a>
                )}
                {profile.socialLinks?.website && (
                  <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary">
                      <Globe className="w-4 h-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {statsLoading ? (
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </motion.div>
        ) : stats ? (
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: BookOpen, label: 'Learning Paths', value: stats.totalLearningPaths, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
              { icon: Award, label: 'Completed', value: stats.completedPaths, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
              { icon: TrendingUp, label: 'Hours Learned', value: `${stats.totalHoursLearned}h`, color: 'text-info', bg: 'bg-info/10', border: 'border-info/20' },
              { icon: Award, label: 'Certificates', value: stats.certificatesEarned, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
            ].map((stat) => (
              <div key={stat.label} className={`p-5 rounded-2xl border ${stat.border} bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group hover-lift`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${stat.bg} transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}

        {/* Tabs */}
        <motion.div variants={item}>
          <Tabs defaultValue="skills" className="mb-6">
            <TabsList>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">Skills</h3>
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground font-body">No skills added yet. Edit your profile to add skills.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">Achievements</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🎯', title: 'First Steps', desc: 'Enrolled in first path', earned: true },
                    { icon: '🔥', title: 'On Fire', desc: '7-day learning streak', earned: true },
                    { icon: '📚', title: 'Bookworm', desc: 'Completed 5 paths', earned: false },
                    { icon: '🏆', title: 'Champion', desc: 'Completed 10 paths', earned: false },
                    { icon: '⭐', title: 'Star Learner', desc: 'Rated 5 courses', earned: true },
                    { icon: '💡', title: 'Knowledge Seeker', desc: 'Read 20 articles', earned: false },
                    { icon: '🚀', title: 'Fast Track', desc: 'Finished path in 1 week', earned: false },
                    { icon: '🎓', title: 'Graduate', desc: 'Earned 3 certificates', earned: true },
                  ].map((ach) => (
                    <div key={ach.title} className={`p-4 rounded-xl border text-center transition-all duration-200 ${ach.earned ? 'border-primary/30 bg-primary/5 hover-glow' : 'border-border/30 bg-muted/20 opacity-50'}`}>
                      <div className="text-3xl mb-2">{ach.icon}</div>
                      <p className="font-medium text-sm">{ach.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="certificates">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">Certificates</h3>
                <div className="space-y-3">
                  {[
                    { title: 'React Fundamentals', date: '2024-01-15', credentialId: 'SB-2024-001' },
                    { title: 'TypeScript Mastery', date: '2024-02-20', credentialId: 'SB-2024-002' },
                  ].map((cert) => (
                    <div key={cert.credentialId} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2.5 rounded-xl bg-warning/10 shrink-0">
                        <Award className="w-5 h-5 text-warning" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">Issued {new Date(cert.date).toLocaleDateString()} • {cert.credentialId}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">Recent Activity</h3>
                {activityLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 rounded-xl" />
                    ))}
                  </div>
                ) : activity?.data && activity.data.length > 0 ? (
                  <div className="space-y-3">
                    {activity.data.map((item) => (
                      <div key={item._id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {item.type === 'enrollment' && <BookOpen className="w-4 h-4 text-primary" />}
                          {item.type === 'completion' && <Award className="w-4 h-4 text-success" />}
                          {item.type === 'achievement' && <TrendingUp className="w-4 h-4 text-warning" />}
                          {item.type === 'update' && <Edit className="w-4 h-4 text-info" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                          <p className="text-xs text-muted-foreground/70 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground font-body">No activity yet.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">Saved Items</h3>
                <div className="space-y-3">
                  {[
                    { type: 'blog', title: 'Getting Started with AI in 2024', icon: FileText, href: '/blog/getting-started-ai-2024' },
                    { type: 'path', title: 'Full Stack Development', icon: BookOpen, href: '/learning-paths/full-stack-development' },
                    { type: 'blog', title: 'React Best Practices', icon: FileText, href: '/blog/react-best-practices' },
                  ].map((saved, i) => (
                    <Link key={i} href={saved.href} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <Bookmark className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{saved.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{saved.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h3 className="font-semibold text-lg mb-4 font-heading">Notification Preferences</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Email Notifications', description: 'Receive email updates about your learning', enabled: profile.preferences?.emailNotifications },
                    { label: 'Push Notifications', description: 'Receive push notifications', enabled: profile.preferences?.pushNotifications },
                    { label: 'Learning Reminders', description: 'Daily reminders to continue learning', enabled: profile.preferences?.learningReminders },
                    { label: 'Weekly Digest', description: 'Weekly summary of your progress', enabled: profile.preferences?.weeklyDigest },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/30">
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                      <Badge variant={item.enabled ? 'default' : 'secondary'}>
                        {item.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Link href="/settings" className="mt-5 inline-block">
                  <Button variant="outline" size="sm">Manage Preferences</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-48 mb-6 rounded-2xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}
