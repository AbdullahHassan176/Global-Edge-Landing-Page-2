# Global Edge Landing Page

A modern, scalable Next.js application for the Global Edge tokenization platform. This application enables users to explore and invest in tokenized real-world assets including shipping containers, real estate, trade inventory, and secure vault storage.

## 🚀 Features

- **Modern Design**: Clean, professional UI with Tailwind CSS
- **Responsive Layout**: Mobile-first design that works on all devices
- **Asset Management**: Browse and filter tokenized assets
- **Interactive Components**: Asset cards, filters, and investment forms
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Next.js 14 with App Router for optimal performance

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6
- **Charts**: Highcharts (for asset performance tracking)
- **State Management**: React Context + useState/useReducer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd global-edge-landing-page-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

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

## 🎨 Design System

### Colors
- Primary Teal: `#007D86` (global-teal)
- Secondary Purple: `#713A9B` (edge-purple)
- Accent Aqua: `#00D4C0` (aqua-start) to `#7F5CD0` (aqua-end)
- Text: `#2B2D42` (charcoal)
- Background: `#F7F9FC` (soft-white)

### Typography
- Primary Font: Inter (body text)
- Secondary Font: Poppins (headings)

## 📱 Pages

- **Home** (`/`): Landing page with hero, features, and insights
- **Assets** (`/assets`): Browse and filter tokenized assets
- **How It Works** (`/how-it-works`): 5-step tokenization process
- **Asset Details** (`/assets/[id]`): Individual asset information (coming soon)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 📝 Development Guidelines

- Use TypeScript for all new components
- Follow the established component structure
- Use Tailwind utility classes for styling
- Implement proper error boundaries
- Add loading states for better UX
- Follow accessibility best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.