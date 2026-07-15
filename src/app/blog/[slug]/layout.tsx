import { Metadata } from 'next';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  
  // In production, you would fetch the post data here
  // For now, we'll use basic metadata
  const title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} | SkillBridge AI Blog`;
  const description = `Read this article on SkillBridge AI Blog about ${slug.replace(/-/g, ' ')}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://skillbridge.ai/blog/${slug}`,
      siteName: 'SkillBridge AI',
      images: [
        {
          url: '/images/og-blog.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-blog.jpg'],
    },
    alternates: {
      canonical: `https://skillbridge.ai/blog/${slug}`,
    },
  };
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return <>{children}</>;
}
