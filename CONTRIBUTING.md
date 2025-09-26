# Contributing to Global Edge Landing Page

Thank you for your interest in contributing to the Global Edge Landing Page! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Global-Edge-Landing-Page-2.git`
3. Install dependencies: `npm install`
4. Copy `env.example` to `.env.local` and configure your environment variables
5. Start the development server: `npm run dev`

## 📋 Development Guidelines

### Code Style
- Follow the existing code style and patterns
- Use TypeScript for all new code
- Follow the ESLint and Prettier configurations
- Write meaningful commit messages

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript types
- Add JSDoc comments for complex functions
- Follow the established component structure

### File Organization
```
src/
├── app/                 # Next.js App Router pages
├── components/         # Reusable React components
│   ├── ui/            # Basic UI components
│   ├── layout/        # Layout components
│   └── forms/         # Form components
├── lib/               # Utilities and services
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## 🧪 Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests for React components
- Aim for at least 80% code coverage

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

## ✨ Feature Requests

When requesting features, please include:
- Clear description of the feature
- Use cases and benefits
- Mockups or examples if applicable
- Any potential implementation considerations

## 🔄 Pull Request Process

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test your changes**
   ```bash
   npm run lint        # Check code style
   npm run type-check  # Check TypeScript
   npm run test        # Run tests
   npm run build       # Ensure build works
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Link any related issues
   - Request review from maintainers

### Pull Request Guidelines
- Keep PRs focused and small
- Include tests for new features
- Update documentation if needed
- Ensure all CI checks pass

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add OAuth login functionality
fix(api): resolve user authentication issue
docs(readme): update installation instructions
```

## 🏷️ Release Process

Releases are managed through GitHub and follow semantic versioning:
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes (backward compatible)

## 📞 Getting Help

- Check existing issues and discussions
- Join our development Discord (if available)
- Contact maintainers directly for urgent issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Global Edge Landing Page! 🚀
