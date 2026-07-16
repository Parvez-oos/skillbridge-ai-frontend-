import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ChevronRight, Sparkles, Zap, Bug, Star, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog - SkillBridge AI',
  description: 'See what\'s new in SkillBridge AI. View our latest features, improvements, and fixes.',
};

const versions = [
  {
    version: '2.1.0',
    date: 'January 2026',
    tag: 'Latest',
    changes: [
      { type: 'feature', text: 'AI Resume Builder - Create ATS-optimized resumes with AI assistance' },
      { type: 'feature', text: 'Career Roadmap Generator - Personalized career paths based on your goals' },
      { type: 'improvement', text: 'Redesigned dashboard with enhanced analytics' },
      { type: 'improvement', text: 'Improved learning path recommendations' },
      { type: 'fix', text: 'Fixed OAuth callback handling for GitHub login' },
    ],
  },
  {
    version: '2.0.0',
    date: 'December 2025',
    tag: 'Major',
    changes: [
      { type: 'feature', text: 'Complete platform redesign with new design system' },
      { type: 'feature', text: 'AI-powered skill recommendations' },
      { type: 'feature', text: 'Real-time progress tracking and analytics' },
      { type: 'improvement', text: 'Enhanced mobile responsiveness' },
      { type: 'improvement', text: 'Faster page load times with optimized bundling' },
      { type: 'fix', text: 'Fixed progress tracking accuracy' },
    ],
  },
  {
    version: '1.5.0',
    date: 'November 2025',
    changes: [
      { type: 'feature', text: 'Blog platform with rich text editor' },
      { type: 'feature', text: 'Community features and discussion forums' },
      { type: 'improvement', text: 'Improved search functionality' },
      { type: 'fix', text: 'Fixed certificate generation issues' },
    ],
  },
  {
    version: '1.0.0',
    date: 'October 2025',
    tag: 'Launch',
    changes: [
      { type: 'feature', text: 'Initial platform launch' },
      { type: 'feature', text: 'Learning path creation and enrollment' },
      { type: 'feature', text: 'User authentication with Google, GitHub, and Facebook' },
      { type: 'feature', text: 'Progress tracking and certificates' },
    ],
  },
];

const changeTypeConfig = {
  feature: { icon: Sparkles, label: 'New', color: 'text-primary bg-primary/10' },
  improvement: { icon: Zap, label: 'Improved', color: 'text-success bg-success/10' },
  fix: { icon: Bug, label: 'Fixed', color: 'text-warning bg-warning/10' },
  security: { icon: Shield, label: 'Security', color: 'text-destructive bg-destructive/10' },
};

export default function ChangelogPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Changelog</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">Updates</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">Changelog</h1>
            <p className="text-lg text-muted-foreground font-body">
              See what&apos;s new in SkillBridge AI. We regularly update the platform with new features, improvements, and fixes.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {versions.map((version, vIndex) => (
                <div key={vIndex} className="relative">
                  {vIndex < versions.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-px bg-border/50" />
                  )}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 relative z-10">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold tracking-tight">v{version.version}</h2>
                        {version.tag && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {version.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{version.date}</p>
                    </div>
                  </div>

                  <div className="ml-16 space-y-3">
                    {version.changes.map((change, cIndex) => {
                      const config = changeTypeConfig[change.type as keyof typeof changeTypeConfig];
                      const Icon = config.icon;
                      return (
                        <div
                          key={cIndex}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                        >
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${config.color}`}>
                            <Icon className="w-3 h-3" />
                            {config.label}
                          </span>
                          <p className="text-sm text-foreground leading-relaxed">{change.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
