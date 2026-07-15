'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Container } from '@/components/ui/Container';
import { ThemeSwitcher } from '@/components/theme';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, LogOut, User, Settings, Sparkles } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Learning Paths', href: '/learning-paths' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Help', href: '/help' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'glass-strong shadow-sm'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl group" aria-label="SkillBridge AI Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">
              SkillBridge
            </span>
            <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">AI</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeSwitcher />
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-muted/50 transition-all duration-200"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-background shadow-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium hidden xl:block">{user?.name}</span>
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform duration-200', userMenuOpen && 'rotate-180')} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-strong shadow-2xl border border-border/50 py-2 z-50 animate-scale-in origin-top-right">
                      <div className="px-4 py-3 border-b border-border/50">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors rounded-lg mx-1"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors rounded-lg mx-1"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 text-muted-foreground" />
                          Profile
                        </Link>
                      </div>
                      <div className="border-t border-border/50 my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 w-full transition-colors rounded-lg mx-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-primary/20 active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-all duration-200"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden pb-4 border-t border-border/50 animate-fade-in-down" role="menu">
            <div className="flex flex-col gap-1 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted/50'
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium hover:bg-muted/50 rounded-xl"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium hover:bg-muted/50 rounded-xl"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 text-left rounded-xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium hover:bg-muted/50 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 rounded-xl"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
