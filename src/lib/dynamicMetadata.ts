import type { Metadata } from 'next';

const SITE = {
  name: 'The Global Edge',
  url: 'https://theglobaledge.io',
  description: 'Tokenizing logistics and real-world assets to unlock global opportunities.',
  ogImage: '/og-image.jpg',
};

const globalKeywords = [
  'real-world asset tokenization',
  'RWA tokens',
  'blockchain',
  'logistics assets',
  'investment platform',
  'UAE VARA compliance',
];

const keywordMap: Record<string, string[]> = {
  '/': ['The Global Edge', 'asset tokenization UAE', 'VARA platform', 'VARA licensed blockchain platform', ...globalKeywords],
  '/assets': ['tokenized assets', 'container tokens', 'real estate tokens', ...globalKeywords],
  '/investors': ['invest in tokenized assets', 'fractional ownership', ...globalKeywords],
  '/issuer': ['issuer portal', 'tokenize assets', 'compliance onboarding', ...globalKeywords],
  '/dashboard': ['portfolio dashboard', 'asset performance', ...globalKeywords],
  '/admin': ['admin console', 'platform administration', ...globalKeywords],
  '/insights': ['tokenization news', 'RWA insights', ...globalKeywords],
  '/status': ['platform status', 'uptime', 'maintenance', ...globalKeywords],
  '/cookies': ['cookies policy', 'analytics cookies', ...globalKeywords],
  '/privacy': ['privacy policy', 'data protection', ...globalKeywords],
  '/terms': ['terms and conditions', 'user agreement', ...globalKeywords],
};

function isPrivatePath(path: string): boolean {
  const lowered = path.toLowerCase();
  return (
    lowered.startsWith('/investor') ||
    lowered.startsWith('/issuer') ||
    lowered.startsWith('/dashboard') ||
    lowered.startsWith('/admin')
  );
}

export async function generateDynamicMetadata({
  path,
  title,
  description,
  image,
  id,
  robots,
  defaultTitle,
  defaultDescription,
}: {
  path: string;
  title?: string;
  description?: string;
  image?: string;
  id?: string;
  robots?: 'index, follow' | 'noindex, nofollow';
  defaultTitle?: string;
  defaultDescription?: string;
}): Promise<Metadata> {
  const resolvedRobots = robots || (isPrivatePath(path) ? 'noindex, nofollow' : 'index, follow');
  const humanize = (p: string) => {
    const seg = p.split('/').filter(Boolean).pop() || '';
    if (!seg) return 'Home';
    return seg
      .replace(/\[|\]/g, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());
  };
  const computedTitle = `${humanize(path)} | ${SITE.name}`;
  const pageTitle = title || defaultTitle || computedTitle;
  const pageDescription = description || defaultDescription || SITE.description;
  const fullUrl = `${SITE.url}${path}`;
  const ogImage = image || SITE.ogImage;
  const keywords = keywordMap[path] || globalKeywords;

  return {
    title: pageTitle,
    description: pageDescription,
    robots: resolvedRobots,
    keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: fullUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pageTitle }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    metadataBase: new URL(SITE.url),
  };
}


