import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - SkillBridge AI',
  description: 'Learn how SkillBridge AI collects, uses, and protects your personal information.',
};

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly and information generated through your use of our platform.

**Account Information:** When you create an account, we collect your name, email address, and password. If you register through a third-party service (Google, GitHub, or Facebook), we receive your basic profile information as authorized by you.

**Profile Data:** We collect information you add to your profile, including skills, career goals, education history, and professional experience. This data enables our AI to personalize your learning experience.

**Learning Activity:** We track your progress through learning paths, course completions, assessment scores, time spent on content, and interaction patterns. This data helps us improve our recommendations and platform.

**Device and Usage Information:** We automatically collect your IP address, browser type, operating system, device identifiers, and usage patterns including pages visited, features used, and time spent on the platform.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect for the following purposes:

**Platform Operation:** To provide, maintain, and improve our platform and its features. This includes displaying your progress, delivering personalized content, and enabling social features.

**Personalization:** To power our AI recommendation engine, generate customized learning paths, career roadmaps, and resume suggestions based on your skills and goals.

**Communication:** To send you account-related notifications, platform updates, and marketing communications (which you can opt out of at any time). We may also send survey invitations and promotional offers.

**Analytics and Research:** To analyze usage patterns, conduct research, and improve our algorithms. We use aggregated and anonymized data for these purposes.

**Security:** To detect and prevent fraud, abuse, and security incidents. We monitor for suspicious activity and enforce our terms of service.`,
  },
  {
    title: 'Information Sharing',
    content: `We do not sell your personal information. We share your information only in the following circumstances:

**Service Providers:** We work with third-party providers who assist in operating our platform, including hosting, payment processing, analytics, and email delivery. These providers are bound by contractual obligations to protect your data.

**With Your Consent:** We may share information when you explicitly authorize us to do so, such as when you share a certificate on LinkedIn or connect with other learners.

**Legal Requirements:** We may disclose information if required by law, regulation, legal process, or governmental request. We will notify you of such requests unless prohibited by law.

**Business Transfers:** In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any change in ownership or use of your personal information.`,
  },
  {
    title: 'Data Security',
    content: `We implement industry-standard security measures to protect your information:

**Encryption:** All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Payment information is processed through PCI-DSS compliant providers.

**Access Controls:** We enforce strict access controls. Only authorized personnel can access user data, and all access is logged and audited.

**Infrastructure:** Our platform is hosted on SOC 2 Type II certified cloud infrastructure with redundant backups and disaster recovery procedures.

**Monitoring:** We continuously monitor for security vulnerabilities and conduct regular penetration testing and security audits.

While we take reasonable measures to protect your information, no method of transmission or storage is completely secure. We cannot guarantee absolute security.`,
  },
  {
    title: 'Your Rights and Choices',
    content: `You have the following rights regarding your personal information:

**Access and Correction:** You can access and update your profile information at any time through your account settings. You can request a copy of all data we hold about you.

**Data Portability:** You can export your data, including learning progress, certificates, and profile information, in standard formats from your dashboard.

**Deletion:** You can delete your account at any time through Settings. Upon deletion, we remove your personal information within 30 days, except where we are required to retain certain records for legal or business purposes.

**Communication Preferences:** You can manage your email notification preferences in Settings. You can opt out of marketing communications while still receiving essential account notifications.

**Cookie Controls:** You can manage cookie preferences through your browser settings. Essential cookies required for platform functionality cannot be disabled.`,
  },
  {
    title: 'Cookies and Tracking',
    content: `We use cookies and similar technologies to operate our platform and improve your experience:

**Essential Cookies:** Required for authentication, security, and core platform functionality. These cannot be disabled.

**Analytics Cookies:** Help us understand how users interact with our platform. We use privacy-focused analytics tools that do not track individual users across websites.

**Preference Cookies:** Remember your settings, language preferences, and theme choices to provide a personalized experience.

We do not use third-party advertising cookies or share your data with advertising networks. We respect "Do Not Track" browser signals.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `SkillBridge AI is not intended for users under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 16, we will delete that information promptly. If you believe we have inadvertently collected information from a child, please contact us immediately.`,
  },
  {
    title: 'International Data Transfers',
    content: `Your information may be processed in countries other than your own. We ensure that international transfers comply with applicable data protection laws through standard contractual clauses and other appropriate safeguards. By using our platform, you consent to the transfer of your information to countries that may have different data protection rules than your country of residence.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform and sending you an email notification. Your continued use of SkillBridge AI after changes take effect constitutes acceptance of the updated policy. We encourage you to review this policy periodically.`,
  },
  {
    title: 'Contact Us',
    content: `If you have questions about this Privacy Policy or our data practices, please contact us:

**Email:** privacy@skillbridge.ai  
**Address:** SkillBridge AI, 123 Innovation Drive, San Francisco, CA 94105  
**Data Protection Officer:** dpo@skillbridge.ai

We respond to privacy-related inquiries within 5 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <Section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 md:pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Privacy Policy</span>
            </nav>
            <span className="font-overline text-primary mb-3 block">Legal</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-6">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground font-body">
              Your privacy matters to us. This policy explains how SkillBridge AI collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2026
            </p>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-8">
                At SkillBridge AI, we are committed to protecting your privacy and ensuring transparency about how we handle your data. This Privacy Policy describes our practices regarding the collection, use, and disclosure of information when you use our platform and services.
              </p>

              <div className="space-y-10">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold tracking-tight mb-4">{section.title}</h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content.split('\n\n').map((paragraph, pIndex) => {
                        if (paragraph.startsWith('**') && paragraph.includes(':**')) {
                          const parts = paragraph.split(':**');
                          return (
                            <p key={pIndex} className="mb-3">
                              <strong className="text-foreground">{parts[0]}:</strong>
                              {parts.slice(1).join(':**')}
                            </p>
                          );
                        }
                        return <p key={pIndex} className="mb-3">{paragraph}</p>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
