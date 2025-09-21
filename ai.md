# Global Edge Landing Page - AI Development Guide

## Project Overview
Global Edge is a tokenization platform for real-world assets including shipping containers, real estate, trade inventory, and secure vault storage. The platform enables fractional ownership of physical assets through blockchain technology with complete transparency and oracle verification.

## Architecture & Key Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Font Awesome 6
- **Charts**: Highcharts (for asset performance tracking)
- **State Management**: React Context + useState/useReducer
- **API**: RESTful API with potential blockchain integration

## Design System
### Colors
- Primary Teal: `#007D86` (global-teal)
- Secondary Purple: `#713A9B` (edge-purple)
- Accent Aqua: `#00D4C0` (aqua-start) to `#7F5CD0` (aqua-end)
- Text: `#2B2D42` (charcoal)
- Background: `#F7F9FC` (soft-white)

### Typography
- Primary Font: Inter (body text)
- Secondary Font: Poppins (headings)

## Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── assets/            # Asset listing pages
│   ├── how-it-works/      # Tokenization process
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── assets/           # Asset-related components
│   └── forms/            # Form components
├── lib/                  # Utilities and configurations
├── types/                # TypeScript type definitions
└── styles/               # Global styles and Tailwind config
```

## Key Components
### Layout Components
- `Header`: Navigation with logo, menu, and CTA buttons
- `Footer`: Company info, links, newsletter signup
- `Breadcrumb`: Navigation breadcrumbs for asset pages

### Asset Components
- `AssetCard`: Individual asset display with metrics and actions
- `AssetGrid`: Grid layout for multiple assets
- `AssetFilters`: Filtering and sorting controls
- `InvestmentSidebar`: Investment form and metrics
- `ProvenanceTimeline`: Asset tracking timeline

### Page Components
- `HeroSection`: Main landing page hero
- `HowItWorks`: 5-step process explanation
- `AssetCategories`: Category overview cards
- `SecurityCompliance`: Security features showcase
- `InsightsTeaser`: Latest articles preview

## Development Guidelines
### Component Structure
- Use functional components with TypeScript
- Implement proper prop interfaces
- Follow single responsibility principle
- Use composition over inheritance

### Styling Conventions
- Use Tailwind utility classes
- Create custom components for repeated patterns
- Maintain consistent spacing and typography
- Use CSS variables for theme colors

### State Management
- Use React Context for global state (user, theme)
- Local state with useState for component-specific data
- Custom hooks for complex logic (asset filtering, search)

### Performance Optimization
- Implement lazy loading for images
- Use Next.js Image component for optimization
- Code splitting for large components
- Memoization for expensive calculations

## Environment Configuration
### Development
- Node.js 18+
- npm/yarn package manager
- Next.js development server
- Hot reloading enabled

### Production
- Vercel deployment (recommended)
- Environment variables for API endpoints
- CDN for static assets
- SSL/HTTPS required

## Error Handling
- Global error boundary for unhandled errors
- Form validation with user-friendly messages
- API error handling with retry mechanisms
- Graceful fallbacks for missing data

## Security Considerations
- Input sanitization for all forms
- CSRF protection for API calls
- Secure cookie handling
- Environment variable protection
- Content Security Policy headers

## Testing Requirements
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for critical user flows
- E2E tests for complete user journeys

## Global Instructions for Code Consistency
1. **Naming Conventions**: Use PascalCase for components, camelCase for functions/variables
2. **File Organization**: Group related components in folders, use index.ts for exports
3. **TypeScript**: Define interfaces for all props and API responses
4. **Accessibility**: Include proper ARIA labels and semantic HTML
5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
6. **Code Comments**: Document complex business logic and component purposes
7. **Error Boundaries**: Wrap major sections in error boundaries
8. **Loading States**: Implement skeleton loaders for better UX
9. **SEO**: Use proper meta tags and structured data
10. **Performance**: Monitor Core Web Vitals and optimize accordingly

## Asset Data Structure
```typescript
interface Asset {
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
}
```

## API Endpoints (Future)
- `/api/assets` - Get asset listings
- `/api/assets/[id]` - Get specific asset details
- `/api/investments` - Handle investment transactions
- `/api/auth` - Authentication endpoints
- `/api/kyc` - KYC verification endpoints

This guide should be updated as the project evolves to maintain consistency and provide clear direction for development.
