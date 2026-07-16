import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import {
  Users,
  MessageSquare,
  Heart,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const metadata: Metadata = {
  title: 'Community - SkillBridge AI',
  description: 'Join the SkillBridge AI community. Connect with learners, share experiences, and grow together.',
};

const channels = [
  {
    icon: MessageSquare,
    title: 'Discussion Forum',
    description: 'Ask questions, share tips, and discuss learning strategies with fellow learners.',
    members: '12,500+',
    href: '#',
  },
  {
    icon: GithubIcon,
    title: 'Open Source',
    description: 'Contribute to SkillBridge AI or explore our open-source projects.',
    members: '3,200+',
    href: 'https://github.com',
  },
  {
    icon: TwitterIcon,
    title: 'Social Media',
    description: 'Follow us for updates, tips, and community highlights.',
    members: '8,900+',
    href: 'https://twitter.com',
  },
];

const events = [
  {
    title: 'Weekly Study Groups',
    description: 'Join facilitated study groups every Wednesday at 7 PM EST to learn together.',
    recurring: true,
  },
  {
    title: 'Monthly AMAs',
    description: 'Ask Me Anything sessions with industry experts and course creators.',
    recurring: true,
  },
  {
    title: 'Hackathons',
    description: 'Build real projects with other learners in our quarterly hackathons.',
    recurring: false,
  },
];

export default function CommunityPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Community</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">Connect</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">Community</h1>
            <p className="text-lg text-muted-foreground font-body mb-8">
              Join thousands of learners who are accelerating their careers together. Share knowledge, get support, and grow.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            overline="Channels"
            title="Join the Conversation"
            description="Connect with learners through your preferred platform."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((channel, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <channel.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{channel.description}</p>
                <p className="text-xs text-primary font-medium mb-4">{channel.members} members</p>
                <a href={channel.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    Join <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-card/30">
        <Container>
          <SectionHeader
            overline="Events"
            title="Community Events"
            description="Regular events to help you learn and connect with other learners."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-destructive" />
                  {event.recurring && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Recurring</span>
                  )}
                </div>
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 grid-pattern" />
            <div className="relative z-10">
              <span className="font-overline text-white/80 mb-3 block">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-4 tracking-tight">
                Start Your Learning Journey
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join our community of learners and start growing your skills today.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white shadow-lg text-base px-8 gap-2">
                  Get Started Free
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
