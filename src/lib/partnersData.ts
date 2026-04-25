/**
 * Partners Data Configuration
 *
 * Only list partners here after you have a signed or public agreement.
 * The landing page and /partners UI read from this list — an empty array
 * is intentional until real partnerships are announced.
 */

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  category: 'logistics' | 'financial' | 'technology' | 'legal' | 'compliance';
  description?: string;
  featured?: boolean;
}

export const partners: Partner[] = [];

export const getPartnersByCategory = (
  category: Partner['category']
): Partner[] => {
  return partners.filter(partner => partner.category === category);
};

export const getFeaturedPartners = (): Partner[] => {
  return partners.filter(partner => partner.featured);
};

export const getPartnersForLandingPage = (): Partner[] => {
  return [];
};

export const getPartnerById = (id: string): Partner | undefined => {
  return partners.find(partner => partner.id === id);
};
