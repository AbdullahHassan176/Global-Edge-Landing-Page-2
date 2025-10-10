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

// 🟢 Homepage — broad, authority-building keywords
const homeKeywords = [
  'The Global Edge',
  'asset tokenization UAE',
  'VARA platform',
  'VARA licensed blockchain platform',
  'rwa',
  'onchain',
  'tokenization of assets',
  'tokenizing',
  'digital asset tokenization',
  'real world assets',
  'asset tokenization platform',
  'blockchain tokenization',
  'tokenization companies',
  ...globalKeywords,
];

// 🟣 Assets page — product-level & investment keywords
const assetsKeywords = [
  'tokenized assets',
  'container tokens',
  'real estate tokens',
  'real estate tokenization',
  'tokenized real world assets',
  'tokenized securities',
  'rwa tokens',
  'rwa tokenization',
  'asset tokenization blockchain',
  'tokenization platform',
  'asset tokenization platform development',
  'tokenized asset',
  'tokenisation company',
  'tokenization of real world assets',
  'real-world asset marketplace',
  'compliant rwa platform',
  'security token',
  'security tokens',
  ...globalKeywords,
];

// 🟠 Investors page — transactional / investing intent
const investorKeywords = [
  'invest in tokenized assets',
  'fractional ownership',
  'fractional blockchain ownership',
  'rwa investment opportunities',
  'real world asset investing',
  'tokenized investment UAE',
  'tokenized real estate',
  'tokenized assets Dubai',
  'how to invest in tokenized assets UAE',
  'digital asset platform',
  ...globalKeywords,
];

// 🔵 Issuer page — business-facing, onboarding intent
const issuerKeywords = [
  'issuer portal',
  'tokenize assets',
  'compliance onboarding',
  'VARA compliance documentation',
  'asset tokenization platform',
  'asset tokenization platforms',
  'real estate tokenization company',
  'real estate tokenization solution',
  'tokenization of real estate',
  'tokenization real estate',
  'tokenization website',
  'tokenization tool',
  'blockchain custody UAE',
  'onchain workshop',
  'regulated token offerings',
  'token issuance UAE',
  ...globalKeywords,
];

// 🧭 Dashboard — user experience & tracking
const dashboardKeywords = [
  'portfolio dashboard',
  'asset performance',
  'investor analytics',
  'investment tracking',
  'portfolio management UAE',
  ...globalKeywords,
];

// ⚙️ Admin — operational and compliance keywords
const adminKeywords = [
  'admin console',
  'platform administration',
  'rwa assets',
  'compliant rwa platform',
  'blockchain regulation UAE',
  'crypto asset compliance',
  'blockchain capital llc',
  ...globalKeywords,
];

// 📰 Insights — informational, SEO-education focus
const insightsKeywords = [
  'tokenization news',
  'RWA insights',
  'what is rwa',
  'what is onchain',
  'what is asset tokenization',
  'ai tokenization',
  'tokenizing real world assets',
  'tokenizing real estate',
  'tokenized real world assets',
  'tokenisation company',
  'digital twin blockchain',
  'security tokens explained',
  ...globalKeywords,
];

// 📡 Status — system trust signals
const statusKeywords = [
  'platform status',
  'uptime',
  'maintenance',
  'system monitoring',
  'service reliability',
  ...globalKeywords,
];

// 🍪 Legal pages
const cookieKeywords = [
  'cookies policy',
  'analytics cookies',
  'cookie management UAE',
  ...globalKeywords,
];

const privacyKeywords = [
  'privacy policy',
  'data protection',
  'UAE privacy compliance',
  'GDPR equivalent UAE',
  ...globalKeywords,
];

const termsKeywords = [
  'terms and conditions',
  'user agreement',
  'legal terms UAE',
  ...globalKeywords,
];

// 🗺️ Final route map
const keywordMap: Record<string, string[]> = {
  '/': homeKeywords,
  '/assets': assetsKeywords,
  '/investors': investorKeywords,
  '/issuer': issuerKeywords,
  '/dashboard': dashboardKeywords,
  '/admin': adminKeywords,
  '/insights': insightsKeywords,
  '/status': statusKeywords,
  '/cookies': cookieKeywords,
  '/privacy': privacyKeywords,
  '/terms': termsKeywords,
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
  const computedTitle = title || defaultTitle || `${humanize(path)} | ${SITE.name}`;
  const pageTitle = computedTitle;
  const pageDescription = description || defaultDescription || SITE.description;
  const fullUrl = `${SITE.url}${path}`;
  const ogImage = image || SITE.ogImage;
  const keywords = keywordMap[path] || globalKeywords;

  return {
    title: pageTitle,
    description: pageDescription,
    robots:
      resolvedRobots === 'noindex, nofollow'
        ? { index: false, follow: false }
        : { index: true, follow: true },
    keywords: keywords.join(', '),
    alternates: { canonical: fullUrl },
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


