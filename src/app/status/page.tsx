import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Status - SkillBridge AI',
  description: 'Check the current status of SkillBridge AI services and systems.',
};

const services = [
  { name: 'Web Application', status: 'operational', uptime: '99.98%' },
  { name: 'API Server', status: 'operational', uptime: '99.99%' },
  { name: 'AI Services', status: 'operational', uptime: '99.95%' },
  { name: 'Authentication', status: 'operational', uptime: '99.99%' },
  { name: 'Database', status: 'operational', uptime: '99.99%' },
  { name: 'CDN', status: 'operational', uptime: '100%' },
];

const incidents = [
  {
    date: 'January 15, 2026',
    title: 'Scheduled Maintenance',
    status: 'resolved',
    description: 'Database maintenance completed successfully. No downtime observed.',
  },
  {
    date: 'January 8, 2026',
    title: 'Elevated API Response Times',
    status: 'resolved',
    description: 'Some users experienced slower than usual API response times. Issue was resolved within 30 minutes.',
  },
];

const statusConfig = {
  operational: { icon: CheckCircle, label: 'Operational', color: 'text-success' },
  degraded: { icon: AlertCircle, label: 'Degraded', color: 'text-warning' },
  outage: { icon: AlertCircle, label: 'Outage', color: 'text-destructive' },
  maintenance: { icon: Clock, label: 'Maintenance', color: 'text-info' },
};

export default function StatusPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Status</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">System</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">System Status</h1>
            <p className="text-lg text-muted-foreground font-body">
              Real-time status of all SkillBridge AI services and systems.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              All systems operational
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Services</h2>
            <div className="space-y-3">
              {services.map((service, index) => {
                const config = statusConfig[service.status as keyof typeof statusConfig];
                const Icon = config.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${config.color}`} />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground hidden sm:block">
                        Uptime: {service.uptime}
                      </span>
                      <span className={`text-sm font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-card/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-border/50 bg-card/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{incident.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{incident.date}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Resolved
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{incident.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
