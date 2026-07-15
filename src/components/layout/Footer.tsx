import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Mail, Heart, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

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

const footerLinks = {
  product: [
    { name: 'Learning Paths', href: '/learning-paths' },
    { name: 'AI Roadmap Generator', href: '/ai/roadmap' },
    { name: 'AI Resume Builder', href: '/ai/resume' },
    { name: 'Features', href: '/#features' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Status', href: '/status' },
    { name: 'Help Center', href: '/help' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com', icon: GithubIcon },
    { name: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
    { name: 'Email', href: 'mailto:contact@skillbridge.ai', icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/50">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-4 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="gradient-text">SkillBridge</span>
                <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">AI</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
                AI-powered learning platform to accelerate your career growth with personalized learning paths and career roadmaps.
              </p>
              <div className="flex gap-2.5">
                {footerLinks.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-200 border border-border/50 hover:border-primary/20"
                    aria-label={item.name}
                  >
                    <item.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SkillBridge AI. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for learners worldwide
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
