import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { CursorGlow } from "@/components/ui/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "SkillBridge AI - AI-Powered Learning & Career Platform",
    template: "%s | SkillBridge AI",
  },
  description: "Accelerate your career with AI-powered personalized learning paths, career roadmaps, and skill recommendations.",
  keywords: ["learning", "career", "AI", "education", "programming", "skills", "roadmap", "resume", "courses"],
  authors: [{ name: "SkillBridge AI" }],
  creator: "SkillBridge AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SkillBridge AI",
    title: "SkillBridge AI - AI-Powered Learning & Career Platform",
    description: "Accelerate your career with AI-powered personalized learning paths, career roadmaps, and skill recommendations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillBridge AI",
    description: "AI-Powered Learning & Career Platform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <Providers>
            <AuthProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:outline-none"
              >
                Skip to content
              </a>
              <div
                id="a11y-announcer"
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
                role="status"
              />
              <CursorGlow />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    borderRadius: '12px',
                    padding: '12px 16px',
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.3)',
                  },
                  success: {
                    iconTheme: {
                      primary: 'var(--success)',
                      secondary: 'white',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: 'var(--destructive)',
                      secondary: 'white',
                    },
                  },
                }}
              />
              <Navbar />
              <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
              <Footer />
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
