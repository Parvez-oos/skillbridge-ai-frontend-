import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Heart,
  Globe,
  Lightbulb,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers - SkillBridge AI',
  description: 'Join the SkillBridge AI team. We are hiring passionate people to help democratize education.',
};

const values = [
  { icon: Heart, title: 'Passion for Learning', description: 'We believe in continuous growth and curiosity.' },
  { icon: Globe, title: 'Global Impact', description: 'We are building a platform that changes lives worldwide.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We push boundaries with cutting-edge AI technology.' },
];

const openings = [
  {
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and scale our learning platform using Next.js, Node.js, and MongoDB.',
  },
  {
    title: 'AI/ML Engineer',
    department: 'AI & Data',
    location: 'Remote',
    type: 'Full-time',
    description: 'Develop AI-powered features for personalized learning and career recommendations.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create beautiful, intuitive interfaces that make learning accessible to everyone.',
  },
  {
    title: 'Content Strategist',
    department: 'Content',
    location: 'Remote',
    type: 'Full-time',
    description: 'Shape our educational content strategy and work with expert course creators.',
  },
];

export default function CareersPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Careers</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">Join Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">Careers</h1>
            <p className="text-lg text-muted-foreground font-body mb-8">
              Help us democratize education and accelerate careers worldwide. We are looking for passionate people to join our team.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            overline="Our Values"
            title="What We Stand For"
            description="The principles that guide everything we do."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 text-center hover:bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-card/30">
        <Container>
          <SectionHeader
            overline="Open Positions"
            title="Current Openings"
            description="Find a role that matches your skills and passion."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((opening, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{opening.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{opening.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Briefcase className="w-3 h-3" />
                        {opening.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {opening.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {opening.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
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
              <span className="font-overline text-white/80 mb-3 block">Interested?</span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-4 tracking-tight">
                Don&apos;t See Your Role?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                We are always looking for talented people. Send us your resume and tell us how you can contribute.
              </p>
              <a href="mailto:careers@skillbridge.ai">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white shadow-lg text-base px-8 gap-2">
                  Send Your Resume
                  <Sparkles className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
