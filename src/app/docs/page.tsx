import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Code,
  Zap,
  Shield,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation - SkillBridge AI',
  description: 'Comprehensive guides, tutorials, and API documentation for SkillBridge AI.',
};

const sections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn the basics of SkillBridge AI and set up your account in minutes.',
    items: [
      { title: 'Quick Start Guide', description: 'Create your account and start learning in under 5 minutes.' },
      { title: 'Platform Overview', description: 'Understand the core features and how they work together.' },
      { title: 'Your First Learning Path', description: 'Step-by-step guide to enrolling in and completing a learning path.' },
    ],
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Integrate SkillBridge AI into your own applications with our REST API.',
    items: [
      { title: 'Authentication', description: 'Secure your API requests with JWT tokens.' },
      { title: 'Learning Paths API', description: 'Create, read, update, and manage learning paths programmatically.' },
      { title: 'User Management', description: 'Manage user profiles, progress, and preferences.' },
    ],
  },
  {
    icon: Zap,
    title: 'AI Features',
    description: 'Harness the power of AI for personalized learning and career growth.',
    items: [
      { title: 'Career Roadmap Generator', description: 'Generate personalized career roadmaps based on your goals.' },
      { title: 'AI Resume Builder', description: 'Create ATS-optimized resumes with AI assistance.' },
      { title: 'Skill Recommendations', description: 'Get AI-powered suggestions for skills to learn next.' },
    ],
  },
  {
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Learn about our security practices and how we protect your data.',
    items: [
      { title: 'Data Protection', description: 'How we encrypt and secure your personal information.' },
      { title: 'OAuth Integration', description: 'Securely connect your Google, GitHub, or Facebook account.' },
      { title: 'Privacy Controls', description: 'Manage your privacy settings and data preferences.' },
    ],
  },
];

export default function DocsPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Documentation</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">Learn</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">Documentation</h1>
            <p className="text-lg text-muted-foreground font-body mb-8">
              Everything you need to get started with SkillBridge AI, from basic setup to advanced API integration.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full h-14 pl-4 pr-4 rounded-2xl border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{section.description}</p>
                <div className="space-y-3">
                  {section.items.map((item, iIndex) => (
                    <div key={iIndex} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-card/30">
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 grid-pattern" />
            <div className="relative z-10">
              <span className="font-overline text-white/80 mb-3 block">Need Help?</span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-4 tracking-tight">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Our support team is here to help you with any questions.
              </p>
              <Link href="/help">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white shadow-lg text-base px-8 gap-2">
                  Visit Help Center
                  <Sparkles className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
