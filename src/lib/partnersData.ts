/**
 * Partners Data Configuration
 * 
 * This file contains all partner information including logos, links, and categories
 * for display on the landing page and partners page.
 */

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  category: 'logistics' | 'financial' | 'technology' | 'legal' | 'compliance';
  description?: string;
  featured?: boolean; // For landing page display
}

export const partners: Partner[] = [
  // Logistics Partners
  {
    id: 'maersk',
    name: 'Maersk',
    logo: 'https://via.placeholder.com/120x60/2563eb/ffffff?text=Maersk',
    website: 'https://www.maersk.com',
    category: 'logistics',
    description: 'Global container shipping and logistics',
    featured: true
  },
  {
    id: 'msc',
    name: 'MSC',
    logo: 'https://via.placeholder.com/120x60/059669/ffffff?text=MSC',
    website: 'https://www.msc.com',
    category: 'logistics',
    description: 'Mediterranean Shipping Company',
    featured: true
  },
  {
    id: 'cma-cgm',
    name: 'CMA CGM',
    logo: 'https://via.placeholder.com/120x60/7c3aed/ffffff?text=CMA+CGM',
    website: 'https://www.cma-cgm.com',
    category: 'logistics',
    description: 'French container transportation and shipping',
    featured: true
  },
  {
    id: 'cosco',
    name: 'COSCO',
    logo: 'https://via.placeholder.com/120x60/dc2626/ffffff?text=COSCO',
    website: 'https://www.coscoshipping.com',
    category: 'logistics',
    description: 'China Ocean Shipping Company',
    featured: true
  },
  {
    id: 'hapag-lloyd',
    name: 'Hapag-Lloyd',
    logo: 'https://via.placeholder.com/120x60/ea580c/ffffff?text=Hapag-Lloyd',
    website: 'https://www.hapag-lloyd.com',
    category: 'logistics',
    description: 'German international shipping and container transportation',
    featured: true
  },
  {
    id: 'one',
    name: 'ONE',
    logo: 'https://via.placeholder.com/120x60/0891b2/ffffff?text=ONE',
    website: 'https://www.one-line.com',
    category: 'logistics',
    description: 'Ocean Network Express',
    featured: true
  },
  {
    id: 'dhl',
    name: 'DHL',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/DHL-Logo.png',
    website: 'https://www.dhl.com',
    category: 'logistics',
    description: 'Global logistics and express shipping',
    featured: true
  },
  {
    id: 'fedex',
    name: 'FedEx',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/FedEx-Logo.png',
    website: 'https://www.fedex.com',
    category: 'logistics',
    description: 'American multinational delivery services',
    featured: true
  },
  {
    id: 'ups',
    name: 'UPS',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/UPS-Logo.png',
    website: 'https://www.ups.com',
    category: 'logistics',
    description: 'United Parcel Service',
    featured: true
  },

  // Financial Partners
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/JPMorgan-Chase-Logo.png',
    website: 'https://www.jpmorganchase.com',
    category: 'financial',
    description: 'American multinational investment bank',
    featured: true
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Goldman-Sachs-Logo.png',
    website: 'https://www.goldmansachs.com',
    category: 'financial',
    description: 'American multinational investment bank',
    featured: true
  },
  {
    id: 'blackrock',
    name: 'BlackRock',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/BlackRock-Logo.png',
    website: 'https://www.blackrock.com',
    category: 'financial',
    description: 'American multinational investment management corporation',
    featured: true
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Fidelity-Logo.png',
    website: 'https://www.fidelity.com',
    category: 'financial',
    description: 'American multinational financial services corporation',
    featured: true
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Vanguard-Logo.png',
    website: 'https://www.vanguard.com',
    category: 'financial',
    description: 'American registered investment advisor',
    featured: true
  },
  {
    id: 'state-street',
    name: 'State Street',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/State-Street-Logo.png',
    website: 'https://www.statestreet.com',
    category: 'financial',
    description: 'American multinational financial services and bank holding company',
    featured: true
  },

  // Technology Partners
  {
    id: 'chainlink',
    name: 'Chainlink',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Chainlink-Logo.png',
    website: 'https://chain.link',
    category: 'technology',
    description: 'Decentralized oracle network',
    featured: true
  },
  {
    id: 'polygon',
    name: 'Polygon',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Polygon-Logo.png',
    website: 'https://polygon.technology',
    category: 'technology',
    description: 'Ethereum scaling solution',
    featured: true
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Ethereum-Logo.png',
    website: 'https://ethereum.org',
    category: 'technology',
    description: 'Decentralized blockchain platform',
    featured: true
  },
  {
    id: 'ipfs',
    name: 'IPFS',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/IPFS-Logo.png',
    website: 'https://ipfs.io',
    category: 'technology',
    description: 'InterPlanetary File System',
    featured: true
  },
  {
    id: 'the-graph',
    name: 'The Graph',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/The-Graph-Logo.png',
    website: 'https://thegraph.com',
    category: 'technology',
    description: 'Decentralized protocol for indexing and querying blockchain data',
    featured: true
  },
  {
    id: 'alchemy',
    name: 'Alchemy',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Alchemy-Logo.png',
    website: 'https://www.alchemy.com',
    category: 'technology',
    description: 'Blockchain infrastructure platform',
    featured: true
  },

  // Legal & Compliance Partners
  {
    id: 'dla-piper',
    name: 'DLA Piper',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/DLA-Piper-Logo.png',
    website: 'https://www.dlapiper.com',
    category: 'legal',
    description: 'Multinational law firm',
    featured: false
  },
  {
    id: 'clifford-chance',
    name: 'Clifford Chance',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Clifford-Chance-Logo.png',
    website: 'https://www.cliffordchance.com',
    category: 'legal',
    description: 'International law firm',
    featured: false
  },
  {
    id: 'latham-watkins',
    name: 'Latham & Watkins',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Latham-Watkins-Logo.png',
    website: 'https://www.lw.com',
    category: 'legal',
    description: 'International law firm',
    featured: false
  },
  {
    id: 'skadden',
    name: 'Skadden',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Skadden-Logo.png',
    website: 'https://www.skadden.com',
    category: 'legal',
    description: 'American multinational law firm',
    featured: false
  },
  {
    id: 'sullivan-cromwell',
    name: 'Sullivan & Cromwell',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Sullivan-Cromwell-Logo.png',
    website: 'https://www.sullcrom.com',
    category: 'legal',
    description: 'American multinational law firm',
    featured: false
  },
  {
    id: 'cravath',
    name: 'Cravath',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Cravath-Logo.png',
    website: 'https://www.cravath.com',
    category: 'legal',
    description: 'American multinational law firm',
    featured: false
  }
];

// Helper functions
export const getPartnersByCategory = (category: Partner['category']): Partner[] => {
  return partners.filter(partner => partner.category === category);
};

export const getFeaturedPartners = (): Partner[] => {
  return partners.filter(partner => partner.featured);
};

export const getPartnersForLandingPage = (): Partner[] => {
  // Return a mix of logistics and financial partners for landing page
  const logisticsPartners = getPartnersByCategory('logistics').slice(0, 6);
  const financialPartners = getPartnersByCategory('financial').slice(0, 6);
  return [...logisticsPartners, ...financialPartners];
};

export const getPartnerById = (id: string): Partner | undefined => {
  return partners.find(partner => partner.id === id);
};
