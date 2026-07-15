import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Target, Users, Lightbulb, Heart, Shield, Globe, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About - SkillBridge AI',
  description: 'Learn about SkillBridge AI and our mission to democratize career-focused learning.',
};

const values = [
  { icon: Target, title: 'Results-Driven', description: 'We focus on measurable outcomes that advance your career.' },
  { icon: Users, title: 'Learner-First', description: 'Every feature is designed with our learners success in mind.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We leverage cutting-edge AI to personalize your learning journey.' },
  { icon: Heart, title: 'Passion', description: 'We are passionate about helping people achieve their dreams.' },
  { icon: Shield, title: 'Trust', description: 'We maintain the highest standards of data privacy and security.' },
  { icon: Globe, title: 'Accessibility', description: 'Learning should be accessible to everyone, everywhere.' },
];

const team = [
  { name: 'Alex Chen', role: 'CEO & Co-Founder', initials: 'AC', bio: 'Former engineering lead at Google with 15+ years in tech education.' },
  { name: 'Sarah Kim', role: 'CTO & Co-Founder', initials: 'SK', bio: 'AI researcher with a PhD from Stanford. Passionate about edtech.' },
  { name: 'Michael Brown', role: 'Head of Product', initials: 'MB', bio: '10 years of product experience at top edtech companies.' },
  { name: 'Emily Davis', role: 'Head of Engineering', initials: 'ED', bio: 'Full-stack engineer building scalable learning platforms.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-overline text-primary mb-3 block">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">About SkillBridge AI</h1>
            <p className="text-lg text-muted-foreground font-body">
              We are on a mission to democratize career-focused learning through the power of artificial intelligence.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-overline text-primary mb-3 block">Our Mission</span>
              <h2 className="text-3xl font-heading tracking-tight mb-6">Making Learning Personal</h2>
              <p className="text-muted-foreground font-body mb-4">
                SkillBridge AI was founded with a simple yet powerful vision: to make career-focused learning
                accessible, personalized, and effective for everyone.
              </p>
              <p className="text-muted-foreground font-body mb-4">
                We believe that everyone deserves a clear path to their dream career. Traditional education
                often fails to provide personalized guidance, leaving learners confused about what skills to
                develop and in what order.
              </p>
              <p className="text-muted-foreground font-body">
                Our AI-powered platform analyzes your current skills, career goals, and learning preferences
                to create a customized roadmap that evolves with you.
              </p>
            </div>
            <div className="glass-strong rounded-3xl p-8 border border-border/50">
              <div className="grid grid-cols-2 gap-4">
                {values.slice(0, 4).map((value, index) => (
                  <div key={index} className="text-center p-4 rounded-2xl bg-muted/30 border border-border/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{value.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-card/30">
        <Container>
          <SectionHeader
            overline="Values"
            title="Our Values"
            description="The principles that guide everything we do."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section>
        <Container>
          <SectionHeader
            overline="Team"
            title="Meet Our Team"
            description="The passionate people behind SkillBridge AI."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, index) => (
              <div key={index} className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary text-sm mb-2 font-medium">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 grid-pattern" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
            <div className="relative z-10">
              <span className="font-overline text-white/80 mb-3 block">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-4 tracking-tight">
                Join Our Journey
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                We are building the future of career-focused learning. Come be a part of it.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white shadow-lg hover:shadow-xl text-base px-8">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
