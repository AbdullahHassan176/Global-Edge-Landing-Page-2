/**
 * Search Integration
 * 
 * This service provides full-text search across assets, users, and investments
 * with database integration and fallback to mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { userAuthService } from '@/lib/userAuthService';
import { assetService } from '@/lib/assetService';
import { Asset, User, Investment } from '@/lib/database/models';

export interface SearchResult {
  id: string;
  type: 'asset' | 'user' | 'investment';
  title: string;
  description: string;
  metadata: any;
  relevanceScore: number;
  category?: string;
  status?: string;
  createdAt: string;
}

export interface SearchFilters {
  type?: 'asset' | 'user' | 'investment' | 'all';
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  minValue?: number;
  maxValue?: number;
}

export interface SearchOptions {
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'value' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export class SearchIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Perform full-text search across all entities
   */
  async search(
    query: string, 
    filters: SearchFilters = {}, 
    options: SearchOptions = {}
  ): Promise<{ success: boolean; results?: SearchResult[]; total?: number; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try database search first
        const dbResult = await this.performDatabaseSearch(query, filters, options);
        if (dbResult.success) {
          return dbResult;
        }
      }

      // Fallback to mock search
      return this.performMockSearch(query, filters, options);
    } catch (error) {
      console.error('Search error:', error);
      return { success: false, error: 'Search failed' };
    }
  }

  /**
   * Search assets specifically
   */
  async searchAssets(
    query: string, 
    filters: Omit<SearchFilters, 'type'> = {}, 
    options: SearchOptions = {}
  ): Promise<{ success: boolean; results?: SearchResult[]; total?: number; error?: string }> {
    return this.search(query, { ...filters, type: 'asset' }, options);
  }

  /**
   * Search users specifically
   */
  async searchUsers(
    query: string, 
    filters: Omit<SearchFilters, 'type'> = {}, 
    options: SearchOptions = {}
  ): Promise<{ success: boolean; results?: SearchResult[]; total?: number; error?: string }> {
    return this.search(query, { ...filters, type: 'user' }, options);
  }

  /**
   * Search investments specifically
   */
  async searchInvestments(
    query: string, 
    filters: Omit<SearchFilters, 'type'> = {}, 
    options: SearchOptions = {}
  ): Promise<{ success: boolean; results?: SearchResult[]; total?: number; error?: string }> {
    return this.search(query, { ...filters, type: 'investment' }, options);
  }

  /**
   * Get search suggestions/autocomplete
   */
  async getSearchSuggestions(
    query: string, 
    limit: number = 10
  ): Promise<{ success: boolean; suggestions?: string[]; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try database suggestions
        const dbResult = await this.getDatabaseSuggestions(query, limit);
        if (dbResult.success) {
          return dbResult;
        }
      }

      // Fallback to mock suggestions
      return this.getMockSuggestions(query, limit);
    } catch (error) {
      console.error('Get search suggestions error:', error);
      return { success: false, error: 'Failed to get suggestions' };
    }
  }

  /**
   * Get popular search terms
   */
  async getPopularSearches(
    limit: number = 10
  ): Promise<{ success: boolean; searches?: string[]; error?: string }> {
    try {
      // For now, return mock popular searches
      const popularSearches = [
        'shipping containers',
        'real estate',
        'trade tokens',
        'vault storage',
        'high yield',
        'low risk',
        'UAE properties',
        'logistics assets',
        'blockchain',
        'tokenized assets'
      ];

      return { 
        success: true, 
        searches: popularSearches.slice(0, limit) 
      };
    } catch (error) {
      console.error('Get popular searches error:', error);
      return { success: false, error: 'Failed to get popular searches' };
    }
  }

  /**
   * Perform database search
   */
  private async performDatabaseSearch(
    query: string, 
    filters: SearchFilters, 
    options: SearchOptions
  ): Promise<{ success: boolean; results?: SearchResult[]; total?: number; error?: string }> {
    try {
      const results: SearchResult[] = [];
      let total = 0;

      // Search assets
      if (!filters.type || filters.type === 'asset' || filters.type === 'all') {
        const assetsResult = await workingDatabaseService.getAssets();
        if (assetsResult.success && assetsResult.data) {
          const assetResults = this.searchAssetsInData(
            assetsResult.data.items, 
            query, 
            filters
          );
          results.push(...assetResults);
          total += assetResults.length;
        }
      }

      // Search users
      if (!filters.type || filters.type === 'user' || filters.type === 'all') {
        const usersResult = await workingDatabaseService.getUsers();
        if (usersResult.success && usersResult.data) {
          const userResults = this.searchUsersInData(
            usersResult.data.items, 
            query, 
            filters
          );
          results.push(...userResults);
          total += userResults.length;
        }
      }

      // Search investments
      if (!filters.type || filters.type === 'investment' || filters.type === 'all') {
        const investmentsResult = await workingDatabaseService.getInvestments();
        if (investmentsResult.success && investmentsResult.data) {
          const investmentResults = this.searchInvestmentsInData(
            investmentsResult.data.items, 
            query, 
            filters
          );
          results.push(...investmentResults);
          total += investmentResults.length;
        }
      }

      // Sort and paginate results
      const sortedResults = this.sortAndPaginateResults(results, options);

      return { success: true, results: sortedResults, total };
    } catch (error) {
      console.error('Database search error:', error);
      return { success: false, error: 'Database search failed' };
    }
  }

  /**
   * Perform mock search
   */
  private async performMockSearch(
    query: string, 
    filters: SearchFilters, 
    options: SearchOptions
  ): Promise<{ success: boolean; results?: SearchResult[]; total?: number; error?: string }> {
    try {
      const results: SearchResult[] = [];

      // Search mock assets
      if (!filters.type || filters.type === 'asset' || filters.type === 'all') {
        const mockAssets = assetService.getAssets();
        const assetResults = this.searchAssetsInData(mockAssets, query, filters);
        results.push(...assetResults);
      }

      // Search mock users
      if (!filters.type || filters.type === 'user' || filters.type === 'all') {
        const mockUsers = userAuthService.getAllUsers();
        const userResults = this.searchUsersInData(mockUsers, query, filters);
        results.push(...userResults);
      }

      // Search mock investments
      if (!filters.type || filters.type === 'investment' || filters.type === 'all') {
        const mockInvestments = userAuthService.getInvestments();
        const investmentResults = this.searchInvestmentsInData(mockInvestments, query, filters);
        results.push(...investmentResults);
      }

      // Sort and paginate results
      const sortedResults = this.sortAndPaginateResults(results, options);

      return { success: true, results: sortedResults, total: results.length };
    } catch (error) {
      console.error('Mock search error:', error);
      return { success: false, error: 'Mock search failed' };
    }
  }

  /**
   * Search assets in data
   */
  private searchAssetsInData(
    assets: Asset[], 
    query: string, 
    filters: SearchFilters
  ): SearchResult[] {
    const queryLower = query.toLowerCase();
    
    return assets
      .filter(asset => {
        // Text search
        const matchesText = 
          asset.name.toLowerCase().includes(queryLower) ||
          asset.description?.toLowerCase().includes(queryLower) ||
          asset.route?.toLowerCase().includes(queryLower) ||
          asset.cargo?.toLowerCase().includes(queryLower) ||
          asset.type?.toLowerCase().includes(queryLower);

        // Category filter
        const matchesCategory = !filters.category || asset.type === filters.category;

        // Status filter
        const matchesStatus = !filters.status || asset.status === filters.status;

        // Value filter
        const assetValue = parseFloat(asset.value?.replace(/[^0-9.-]+/g, '') || '0');
        const matchesMinValue = !filters.minValue || assetValue >= filters.minValue;
        const matchesMaxValue = !filters.maxValue || assetValue <= filters.maxValue;

        // Date filter
        const matchesDate = !filters.dateRange || (
          new Date(asset.createdAt) >= new Date(filters.dateRange.start) &&
          new Date(asset.createdAt) <= new Date(filters.dateRange.end)
        );

        return matchesText && matchesCategory && matchesStatus && 
               matchesMinValue && matchesMaxValue && matchesDate;
      })
      .map(asset => ({
        id: asset.id,
        type: 'asset' as const,
        title: asset.name,
        description: asset.description || `${asset.type} asset on ${asset.route}`,
        metadata: {
          value: asset.value,
          apr: asset.apr,
          risk: asset.risk,
          route: asset.route,
          cargo: asset.cargo,
          issuerId: asset.issuerId
        },
        relevanceScore: this.calculateRelevanceScore(asset.name, query),
        category: asset.type,
        status: asset.status,
        createdAt: asset.createdAt
      }));
  }

  /**
   * Search users in data
   */
  private searchUsersInData(
    users: User[], 
    query: string, 
    filters: SearchFilters
  ): SearchResult[] {
    const queryLower = query.toLowerCase();
    
    return users
      .filter(user => {
        // Text search
        const matchesText = 
          user.firstName?.toLowerCase().includes(queryLower) ||
          user.lastName?.toLowerCase().includes(queryLower) ||
          user.email?.toLowerCase().includes(queryLower) ||
          user.phone?.toLowerCase().includes(queryLower) ||
          user.role?.toLowerCase().includes(queryLower) ||
          user.country?.toLowerCase().includes(queryLower);

        // Status filter
        const matchesStatus = !filters.status || user.status === filters.status;

        // Date filter
        const matchesDate = !filters.dateRange || (
          new Date(user.createdAt) >= new Date(filters.dateRange.start) &&
          new Date(user.createdAt) <= new Date(filters.dateRange.end)
        );

        return matchesText && matchesStatus && matchesDate;
      })
      .map(user => ({
        id: user.id,
        type: 'user' as const,
        title: `${user.firstName} ${user.lastName}`,
        description: `${user.role} from ${user.country}`,
        metadata: {
          email: user.email,
          phone: user.phone,
          role: user.role,
          country: user.country,
          kycStatus: user.kycStatus
        },
        relevanceScore: this.calculateRelevanceScore(`${user.firstName} ${user.lastName}`, query),
        category: user.role,
        status: user.status,
        createdAt: user.createdAt
      }));
  }

  /**
   * Search investments in data
   */
  private searchInvestmentsInData(
    investments: Investment[], 
    query: string, 
    filters: SearchFilters
  ): SearchResult[] {
    const queryLower = query.toLowerCase();
    
    return investments
      .filter(investment => {
        // Text search
        const matchesText = 
          investment.assetId?.toLowerCase().includes(queryLower) ||
          investment.userId?.toLowerCase().includes(queryLower) ||
          investment.status?.toLowerCase().includes(queryLower) ||
          investment.type?.toLowerCase().includes(queryLower);

        // Status filter
        const matchesStatus = !filters.status || investment.status === filters.status;

        // Value filter
        const matchesMinValue = !filters.minValue || investment.amount >= filters.minValue;
        const matchesMaxValue = !filters.maxValue || investment.amount <= filters.maxValue;

        // Date filter
        const matchesDate = !filters.dateRange || (
          new Date(investment.createdAt) >= new Date(filters.dateRange.start) &&
          new Date(investment.createdAt) <= new Date(filters.dateRange.end)
        );

        return matchesText && matchesStatus && 
               matchesMinValue && matchesMaxValue && matchesDate;
      })
      .map(investment => ({
        id: investment.id,
        type: 'investment' as const,
        title: `Investment in ${investment.assetId}`,
        description: `${investment.type} investment of $${investment.amount.toLocaleString()}`,
        metadata: {
          amount: investment.amount,
          type: investment.type,
          assetId: investment.assetId,
          userId: investment.userId,
          expectedReturn: investment.expectedReturn
        },
        relevanceScore: this.calculateRelevanceScore(investment.assetId || '', query),
        category: investment.type,
        status: investment.status,
        createdAt: investment.createdAt
      }));
  }

  /**
   * Calculate relevance score for search results
   */
  private calculateRelevanceScore(text: string, query: string): number {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Exact match gets highest score
    if (textLower === queryLower) return 100;
    
    // Starts with query gets high score
    if (textLower.startsWith(queryLower)) return 90;
    
    // Contains query gets medium score
    if (textLower.includes(queryLower)) return 70;
    
    // Word boundary match gets lower score
    const words = textLower.split(/\s+/);
    const queryWords = queryLower.split(/\s+/);
    const matchingWords = queryWords.filter(qWord => 
      words.some(word => word.includes(qWord))
    );
    
    return (matchingWords.length / queryWords.length) * 50;
  }

  /**
   * Sort and paginate results
   */
  private sortAndPaginateResults(
    results: SearchResult[], 
    options: SearchOptions
  ): SearchResult[] {
    const { sortBy = 'relevance', sortOrder = 'desc', limit = 20, offset = 0 } = options;

    // Sort results
    results.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'relevance':
          comparison = a.relevanceScore - b.relevanceScore;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'value':
          const aValue = parseFloat(a.metadata.value?.replace(/[^0-9.-]+/g, '') || '0');
          const bValue = parseFloat(b.metadata.value?.replace(/[^0-9.-]+/g, '') || '0');
          comparison = aValue - bValue;
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Paginate results
    return results.slice(offset, offset + limit);
  }

  /**
   * Get database suggestions
   */
  private async getDatabaseSuggestions(
    query: string, 
    limit: number
  ): Promise<{ success: boolean; suggestions?: string[]; error?: string }> {
    try {
      // For now, return mock suggestions
      // In a real implementation, you would query the database for suggestions
      return this.getMockSuggestions(query, limit);
    } catch (error) {
      console.error('Database suggestions error:', error);
      return { success: false, error: 'Failed to get database suggestions' };
    }
  }

  /**
   * Get mock suggestions
   */
  private getMockSuggestions(
    query: string, 
    limit: number
  ): { success: boolean; suggestions?: string[]; error?: string } {
    const allSuggestions = [
      'shipping containers',
      'real estate properties',
      'trade tokens',
      'vault storage',
      'UAE logistics',
      'blockchain assets',
      'high yield investments',
      'low risk assets',
      'tokenized real estate',
      'container shipping',
      'logistics assets',
      'investment opportunities',
      'asset management',
      'portfolio diversification'
    ];

    const queryLower = query.toLowerCase();
    const matchingSuggestions = allSuggestions
      .filter(suggestion => suggestion.toLowerCase().includes(queryLower))
      .slice(0, limit);

    return { success: true, suggestions: matchingSuggestions };
  }
}

// Export singleton instance
export const searchIntegration = new SearchIntegration();
