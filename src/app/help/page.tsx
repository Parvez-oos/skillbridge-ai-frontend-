import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import {
  HelpCircle,
  BookOpen,
  CreditCard,
  User,
  Settings,
  MessageSquare,
  ChevronRight,
  Search,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center - SkillBridge AI',
  description: 'Get help with SkillBridge AI. Find answers to frequently asked questions, contact support, and learn how to use our platform.',
};

const faqCategories = [
  {
    icon: User,
    title: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Get Started" button on our homepage or navigate to the registration page. You can sign up using your email address or through Google, GitHub, or Facebook. After registering, you will receive a confirmation email to verify your account.',
      },
      {
        q: 'How do I complete my profile?',
        a: 'Navigate to your Profile page from the dashboard. Fill in your skills, experience, and career goals. The more information you provide, the better our AI can personalize your learning path and career recommendations.',
      },
      {
        q: 'Can I switch between learning paths?',
        a: 'Yes. You can enroll in multiple learning paths simultaneously or switch between them at any time. Your progress is saved independently for each path, so you never lose your work.',
      },
    ],
  },
  {
    icon: BookOpen,
    title: 'Learning Paths',
    questions: [
      {
        q: 'What are learning paths?',
        a: 'Learning paths are structured sequences of courses, projects, and assessments designed to take you from your current skill level to your career goal. Each path is curated by industry experts and enhanced with AI-powered personalization.',
      },
      {
        q: 'How long does it take to complete a learning path?',
        a: 'Completion time varies by path and your pace. Most learners complete intermediate paths in 8 to 12 weeks, while advanced paths may take 16 to 20 weeks. You can learn at your own pace with no strict deadlines.',
      },
      {
        q: 'Do I get a certificate upon completion?',
        a: 'Yes. After completing all requirements in a learning path, you receive a verified digital certificate that you can share on LinkedIn, include in your resume, or present to employers.',
      },
      {
        q: 'Can I track my progress?',
        a: 'Absolutely. Your dashboard provides real-time progress tracking including completed modules, current streak, skills acquired, and time invested. You can also view detailed analytics in the Analytics section.',
      },
    ],
  },
  {
    icon: CreditCard,
    title: 'Billing & Plans',
    questions: [
      {
        q: 'Is there a free plan?',
        a: 'Yes. SkillBridge AI offers a generous free tier that includes access to select learning paths, basic AI features, and community forums. No credit card is required to get started.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.',
      },
      {
        q: 'Can I cancel my subscription?',
        a: 'Yes. You can cancel your subscription at any time from your Settings page. Your access continues until the end of your current billing period. We also offer a 30-day money-back guarantee for annual plans.',
      },
      {
        q: 'Do you offer team or enterprise pricing?',
        a: 'Yes. We offer special pricing for teams of 5 or more. Enterprise plans include custom learning paths, dedicated support, advanced analytics, and SSO integration. Contact our sales team for details.',
      },
    ],
  },
  {
    icon: Settings,
    title: 'Account & Settings',
    questions: [
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page and enter your email address. You will receive a password reset link within a few minutes. If you do not see the email, check your spam folder.',
      },
      {
        q: 'Can I change my email address?',
        a: 'Yes. Go to Settings, select the Profile tab, and update your email address. You will need to verify your new email address before the change takes effect.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Navigate to Settings, select the Account tab, and choose "Delete Account." This action is irreversible. Before deleting, we recommend downloading any certificates or data you wish to keep.',
      },
    ],
  },
];

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time. Available Monday through Friday, 9 AM to 6 PM EST.',
    action: 'Start Chat',
  },
  {
    icon: MessageSquare,
    title: 'Email Support',
    description: 'Send us a detailed message and we will respond within 24 hours on business days.',
    action: 'Send Email',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Browse our comprehensive guides, tutorials, and API documentation.',
    action: 'View Docs',
  },
];

export default function HelpPage() {
  return (
    <div>
      {/* Hero */}
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Help Center</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">Support</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">Help Center</h1>
            <p className="text-lg text-muted-foreground font-body mb-8">
              Find answers to your questions, learn how to use SkillBridge AI, and get the support you need.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Categories */}
      <Section>
        <Container>
          <SectionHeader
            overline="FAQ"
            title="Frequently Asked Questions"
            description="Browse our most common questions and answers."
          />
          <div className="space-y-12">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.questions.map((item, qIndex) => (
                    <div
                      key={qIndex}
                      className="p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Support */}
      <Section className="bg-card/30">
        <Container>
          <SectionHeader
            overline="Contact"
            title="Still Need Help?"
            description="Our support team is here to assist you."
          />
          <div className="grid md:grid-cols-3 gap-5">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 text-center hover:bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{method.description}</p>
                <Button variant="outline" size="sm">{method.action}</Button>
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
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners advancing their careers with personalized AI-powered learning paths.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white/95 text-primary hover:bg-white shadow-lg hover:shadow-xl text-base px-8 gap-2">
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
