# MEXMA - Crypto Analytics Intelligence Platform

## 🚀 Overview

MEXMA is a sophisticated AI-powered cryptocurrency analytics platform built with Next.js 15, featuring real-time market data, NFT analytics, AI-driven gem discovery, and comprehensive Solana blockchain integration.

## ✨ Key Features

- **🔍 Live Gem Scanner**: Real-time Solana meme coin discovery with AI scoring
- **📊 Market Intelligence**: Live crypto price data and market analysis
- **🎯 AI-Powered Analytics**: Multi-factor algorithmic analysis for investment insights
- **🔗 Solana Integration**: Complete DEX integration with Jupiter client
- **📈 Portfolio Tracking**: Real-time portfolio monitoring and updates
- **🛡️ Security Analytics**: Threat intelligence and whale tracking
- **🎨 Modern UI**: Professional dashboard with consistent design system

## 🛠️ Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Runtime**: React 19.1.0 with Server Components
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom MEXMA design system
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multi-wallet integration
- **Real-time Data**: DexScreener API + Jupiter DEX integration
- **Deployment**: Vercel-optimized with Edge Runtime support

## 🏗️ Project Structure

```
mexma_dashboard/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   ├── gems/          # Gem discovery endpoints
│   │   └── sentiment/      # Market sentiment API
│   ├── globals.css         # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard page
├── components/             # React components
│   ├── gem-scanner/       # Gem Scanner components
│   ├── market-intelligence/ # Market Intelligence components
│   ├── ui/                # Reusable UI components
│   └── ...                # Other dashboard components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and services
│   ├── services/          # External API services
│   ├── types.ts          # TypeScript definitions
│   └── utils.ts          # Utility functions
├── public/                # Static assets
│   ├── crypto-logos/      # Cryptocurrency logos
│   ├── meme-logos/        # Meme coin logos
│   └── images/            # Other images
└── prisma/               # Database schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/didier3529/mexma-ai-abacus.git
   cd mexma-ai-abacus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your database URL and API keys to `.env.local`

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 API Endpoints

### Gem Discovery API
- `GET /api/gems/live` - Live gem discovery with AI scoring
- `GET /api/gems/sentiment` - Market sentiment analysis

### Parameters
- `category`: Token category (meme, defi, gaming, etc.)
- `limit`: Number of results (max 10)
- `network`: Blockchain network (solana, ethereum, etc.)

## 🎨 Design System

### Color Palette
- **Primary**: Orange gradient (`#FF8C00` → `#FFD700`)
- **Background**: Dark theme (`#1a1a1a`)
- **Accent**: Orange (`#FF6B35`)
- **Text**: White with gray variants

### Typography
- **Font**: Inter (Google Fonts)
- **Gradients**: `mexma-text-gradient` class for titles
- **Sizing**: Consistent scale from `text-xs` to `text-3xl`

### Components
- **Cards**: Consistent padding, borders, and shadows
- **Icons**: Lucide React icons with orange accents
- **Buttons**: Rounded corners with hover states
- **Layout**: Responsive grid system

## 🔧 Configuration

### Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
DEXSCREENER_API_KEY="your-api-key"
JUPITER_API_KEY="your-api-key"
```

### Tailwind Configuration
Custom colors and utilities are defined in `tailwind.config.ts`:
- MEXMA orange gradient
- Custom spacing and sizing
- Dark theme configuration

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📈 Performance

### Optimizations
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: API response caching with revalidation
- **Edge Runtime**: Faster cold starts on Vercel

### Monitoring
- Real-time error tracking
- Performance metrics
- API response time monitoring
- User interaction analytics

## 🔒 Security

### Authentication
- Multi-wallet support (MetaMask, Phantom)
- Secure session management
- CSRF protection

### API Security
- Rate limiting
- Input validation
- Error handling without data exposure
- CORS configuration

## 🧪 Testing

### Development Testing
```bash
npm run dev          # Start development server
npm run build        # Test production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### API Testing
Test endpoints using curl or Postman:
```bash
curl http://localhost:3000/api/gems/live?category=meme&limit=5
```

## 📚 Documentation

### Component Documentation
- All components include TypeScript interfaces
- Props are documented with JSDoc comments
- Usage examples in component files

### API Documentation
- OpenAPI/Swagger documentation available
- Endpoint descriptions and examples
- Error response formats

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

## 📞 Support

### Issues
Report bugs and feature requests on GitHub Issues.

### Community
Join our Discord community for discussions and support.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- DexScreener for market data API
- Jupiter for Solana DEX integration
- Vercel for hosting and deployment
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

---

**Built with ❤️ by the MEXMA team**

*Last updated: January 2025*
