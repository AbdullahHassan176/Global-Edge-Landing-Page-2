# Global Edge Landing Page - AI Assistant Guide

## Project Overview
The Global Edge is a VARA-compliant platform for real-world asset tokenization in the UAE. The platform enables fractional ownership of shipping containers, real estate, and trade inventory through blockchain technology.

## Architecture & Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel-ready
- **Database**: Integration services for asset management
- **Authentication**: OAuth and custom auth services

## Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── [route]/           # Route-specific pages
│   │   ├── page.tsx       # Page component
│   │   └── layout.tsx     # Route layout with metadata
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility libraries and services
│   ├── services/         # Business logic services
│   ├── integration/      # External API integrations
│   └── config/           # Configuration files
└── types/                # TypeScript type definitions
```

## Key Components & Relationships
- **Asset Management**: Tokenized real-world assets (containers, property, trade tokens, vault)
- **User Authentication**: Multi-role system (investors, issuers, admins)
- **Investment Flow**: KYC → Asset Selection → Investment → Portfolio Management
- **Compliance**: VARA regulatory compliance throughout the platform

## Development Guidelines & Conventions

### SEO & Metadata Management
- **CRITICAL**: All pages must use Next.js App Router Metadata API
- **NEVER** use `<Head>` from `next/head` in page components
- **ALWAYS** implement `generateMetadata()` in layout.tsx files
- **JSON-LD** structured data goes in `other` field of metadata
- **Canonical URLs** must be set for all pages

### Code Standards
- Use TypeScript for all new code
- Follow existing naming conventions (camelCase for variables, PascalCase for components)
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Use semantic HTML elements

### Component Structure
- Keep components focused and single-purpose
- Use proper TypeScript interfaces
- Implement proper accessibility (ARIA labels, semantic HTML)
- Follow responsive design principles

## Environment Configuration
- Development: Local development with mock data
- Production: Full integration with external services
- Environment variables managed through `.env` files

## Error Handling Approach
- Graceful degradation for external service failures
- User-friendly error messages
- Fallback to mock data when services are unavailable
- Comprehensive logging for debugging

## Security Considerations
- VARA compliance requirements
- KYC/KYB verification processes
- Secure API endpoints
- Input validation and sanitization
- CORS and security headers

## Testing Requirements
- Unit tests for utility functions
- Integration tests for API endpoints
- Component testing for critical UI elements
- E2E testing for user flows

## Global Instructions for Code Consistency

### Metadata Migration (Current Priority)
1. **Remove all `<Head>` imports and blocks** from page.tsx files
2. **Move SEO metadata to layout.tsx** using `generateMetadata()` function
3. **Preserve JSON-LD structured data** in `other` field
4. **Maintain canonical URLs** and Open Graph tags
5. **Verify no duplicate metadata** after migration

### Asset Management
- All asset data flows through `assetService` and `assetIntegration`
- Mock data available for development
- Real-time data from oracle networks
- Proper error handling for data loading failures

### User Experience
- Loading states for all async operations
- Responsive design for all screen sizes
- Accessibility compliance (WCAG 2.1)
- Smooth transitions and animations

### Performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient state management
- Minimal bundle size

## Current Migration Status
- **In Progress**: Removing `<Head>` imports and migrating to Metadata API
- **Target**: All 49 pages with Head imports need migration
- **Priority**: Start with main pages (home, FAQ, assets, how-it-works)

## Notes for AI Assistants
- Always check for existing `ai.md` file for project context
- Follow the established patterns in the codebase
- Maintain VARA compliance in all implementations
- Use the existing design system and component library
- Test changes thoroughly before deployment

