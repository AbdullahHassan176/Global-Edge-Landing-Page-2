export interface Asset {
  id: string;
  name: string;
  type: 'container' | 'property' | 'tradetoken' | 'vault';
  apr: number;
  tenor: string;
  minInvestment: number;
  totalValue: number;
  fundedPercentage: number;
  status: 'active' | 'funding' | 'pending' | 'completed';
  location: string;
  description: string;
  image: string;
  tags: string[];
  riskLevel: 'low' | 'medium' | 'high';
  verified: boolean;
  route?: string;
  cargoType?: string;
  transitTime?: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  avgApr: string;
  color: string;
}

export interface TokenizationStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  duration: string;
  icon: string;
  color: string;
}

export interface Insight {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface FilterOptions {
  assetType?: string;
  region?: string;
  aprRange?: string;
  tenor?: string;
  riskLevel?: string;
  sortBy?: string;
}

export interface InvestmentForm {
  amount: number;
  assetId: string;
}

export interface ProvenanceEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: string;
}
