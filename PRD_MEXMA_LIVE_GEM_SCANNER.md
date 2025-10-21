# PRD: MEXMA LIVE GEM SCANNER
## Product Requirements Document for Live MEME Coin Discovery with AI Scoring

---

## 🎯 **PROJECT OBJECTIVE**

Create a **live Gem Scanner** for the Mexma Dashboard that displays **4 MEME coins** with real-time data, AI scoring, and comprehensive logo integration. The scanner should match the functionality of the MixMyAI Indian version while being fully integrated into the Mexma app's navigation structure.

### **Core Requirements:**
1. **🔍 Live Gem Scanner** - 4 MEME coins with real-time updates
2. **💎 AI Scoring System** - Keep AI scores in current position/format
3. **📊 Data Columns** - Market cap, prices, volume, AI score, risk assessment
4. **🖼️ Logo Integration** - Ensure all coin logos are loaded and displayed
5. **⚡ Real-time Updates** - 10-30 second refresh intervals

---

## 📋 **CURRENT STATE ANALYSIS**

### **✅ What We Have (Indian Version - Reference Implementation):**
- **BradleyGemScanner**: Fully functional with live Solana gems
- **Live API**: `/api/gems/live` endpoint operational
- **AI Scoring**: 5-factor weighted analysis system (0-100 scale)
- **Comprehensive Logos**: 10 meme coin logos + crypto assets
- **Real-time Data**: DexScreener and Jupiter integrations

### **✅ What We Have (Current App - Target Location):**
- **Basic Gem Scanner**: `/app/components/gem-scanner/bradley-gem-scanner.tsx`
- **API Infrastructure**: `/app/app/api/gems/live/route.ts`
- **Hooks**: `/app/hooks/use-gem-data.ts`
- **Premium UI**: Black theme with professional styling

### **🎯 Gap Analysis:**
- ❌ Missing meme coin logos in `/app/public/`
- ❌ Limited to basic display vs. comprehensive scanner
- ❌ No logo integration in current components
- ❌ Missing AI score display formatting

---

## 🏗️ **TECHNICAL SPECIFICATIONS**

### **Phase 1: Asset Migration (Day 1)**

#### **1.1 Logo Asset Transfer**
```
Source: /Mexma AI indian version/public/meme-logos/
Target: /app/public/meme-logos/

Required Logos:
├── bonk.svg          ✅ BONK token logo
├── wen.svg           ✅ WEN token logo  
├── popcat.svg        ✅ POPCAT token logo
├── mew.svg           ✅ MEW token logo
├── michi.svg         ✅ MICHI token logo
├── pnut.svg          ✅ PNUT token logo
├── myro.svg          ✅ MYRO token logo
├── bome.svg          ✅ BOME token logo
├── shib.png          ✅ SHIB token logo
└── doge.png          ✅ DOGE token logo
```

#### **1.2 Crypto Logo Assets**
```
Source: /Mexma AI indian version/public/crypto-logos/
Target: /app/public/crypto-logos/

Priority Logos:
├── solana-logo.svg   ✅ SOL
├── bitcoin-logo.svg  ✅ BTC
├── ethereum-logo.svg ✅ ETH (if available)
├── arbitrum-logo.svg ✅ ARB
├── polygon-logo.svg  ✅ MATIC
├── avalanche-logo.svg ✅ AVAX
├── cardano-logo.svg  ✅ ADA
└── chainlink-logo.svg ✅ LINK
```

#### **1.3 Section Logo**
```
Source: /Mexma AI indian version/public/images/section-logos/
Target: /app/public/images/section-logos/

Required:
└── gem-scanner.png   ✅ Main scanner icon
```

### **Phase 2: Component Enhancement (Day 1-2)**

#### **2.1 Enhanced Gem Scanner Component**

**Target:** `/app/components/gem-scanner/bradley-gem-scanner.tsx`

**Key Features to Implement:**
```typescript
interface GemScannerFeatures {
  // Data Display
  realTimeUpdates: boolean;           // ✅ 10-30 second refresh
  memeCoins: Array<MemeToken>;        // ✅ 4 primary MEME coins
  aiScoring: AIScore;                 // ✅ Keep current position
  
  // UI Components
  logoIntegration: boolean;           // ✅ Dynamic logo loading
  dataColumns: {
    symbol: string;                   // ✅ Token symbol
    name: string;                     // ✅ Full name
    price: string;                    // ✅ Current price
    priceChange24h: string;           // ✅ 24h change %
    marketCap: string;                // ✅ Market capitalization
    volume24h: string;                // ✅ 24h trading volume
    aiScore: number;                  // ✅ AI score (0-100)
    riskLevel: 'Low' | 'Medium' | 'High'; // ✅ Risk assessment
  };
  
  // Interactive Features
  copyAddress: boolean;               // ✅ Copy contract address
  refreshButton: boolean;             // ✅ Manual refresh
  liveIndicator: boolean;             // ✅ Live status indicator
}
```

#### **2.2 Logo Component Integration**

```typescript
// Enhanced Logo Component
interface GemLogoProps {
  tokenSymbol: string;
  tokenName: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackIcon?: React.ComponentType;
}

const GemLogo: React.FC<GemLogoProps> = ({ 
  tokenSymbol, 
  tokenName, 
  size = 'md',
  fallbackIcon: FallbackIcon = Search 
}) => {
  const logoPath = `/meme-logos/${tokenSymbol.toLowerCase()}.svg`;
  
  return (
    <div className="relative">
      <img
        src={logoPath}
        alt={`${tokenName} Logo`}
        className={`object-contain drop-shadow-lg ${sizeClasses[size]}`}
        onError={(e) => {
          // Bulletproof fallback system
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <FallbackIcon className={`hidden text-white ${sizeClasses[size]}`} />
      <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm animate-pulse"></div>
    </div>
  );
};
```

### **Phase 3: Data Configuration (Day 2)**

#### **3.1 Target MEME Coins Configuration**

```typescript
const TARGET_MEME_COINS = [
  {
    symbol: 'BONK',
    name: 'Bonk',
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    logo: '/meme-logos/bonk.svg',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'WEN', 
    name: 'Wen',
    address: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',
    logo: '/meme-logos/wen.svg',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'POPCAT',
    name: 'Popcat',
    address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', 
    logo: '/meme-logos/popcat.svg',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'MEW',
    name: 'Cat in a Dogs World',
    address: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
    logo: '/meme-logos/mew.svg', 
    network: 'solana',
    dex: 'raydium'
  }
] as const;
```

#### **3.2 Data Column Specifications**

```typescript
interface GemDataColumns {
  // Logo & Identity
  logo: {
    width: '40px';
    height: '40px';
    borderRadius: '50%';
    fallback: 'Search icon';
  };
  
  // Token Info
  symbol: {
    format: 'UPPERCASE';
    maxLength: 8;
    fontWeight: 'bold';
  };
  
  name: {
    format: 'Title Case';
    maxLength: 20;
    color: 'text-gray-400';
  };
  
  // Price Data
  price: {
    format: 'Smart precision (2-6 decimals)';
    prefix: '$';
    color: 'text-white';
  };
  
  priceChange24h: {
    format: '+/-X.XX%';
    positiveColor: 'text-green-400';
    negativeColor: 'text-red-400';
  };
  
  // Market Data
  marketCap: {
    format: 'Abbreviated ($1.2M, $850K)';
    color: 'text-white';
  };
  
  volume24h: {
    format: 'Abbreviated ($2.5M, $1.8M)';
    color: 'text-gray-300';
  };
  
  // AI Analysis (KEEP CURRENT POSITION)
  aiScore: {
    format: 'Integer (0-100)';
    color: 'Dynamic based on score';
    position: 'MAINTAIN_CURRENT_LOCATION';
    badge: true;
  };
  
  riskLevel: {
    format: 'Badge with color';
    colors: {
      Low: 'bg-green-500/20 text-green-400';
      Medium: 'bg-yellow-500/20 text-yellow-400'; 
      High: 'bg-red-500/20 text-red-400';
    };
  };
}
```

### **Phase 4: API Integration (Day 2-3)**

#### **4.1 Enhanced API Endpoint**

**Target:** `/app/app/api/gems/live/route.ts`

**Required Enhancements:**
```typescript
// API Response Format
interface GemAPIResponse {
  success: boolean;
  data: Array<{
    // Identity
    symbol: string;
    name: string;
    address: string;
    logo: string;
    
    // Market Data
    price: number;
    priceChange24h: number;
    marketCap: number;
    volume24h: number;
    
    // AI Analysis
    aiScore: number;           // 0-100 scale
    riskLevel: 'Low' | 'Medium' | 'High';
    
    // Metadata
    network: 'solana';
    dex: 'raydium';
    lastUpdated: string;
    isNew: boolean;
  }>;
  metadata: {
    totalFound: number;
    lastRefresh: string;
    cacheTTL: number;
  };
}
```

#### **4.2 Logo Serving Configuration**

```typescript
// Next.js Public Asset Configuration
const LOGO_CONFIG = {
  basePath: '/meme-logos',
  supportedFormats: ['svg', 'png'],
  fallbackStrategy: 'icon',
  caching: {
    maxAge: '1h',
    staleWhileRevalidate: '24h'
  }
};
```

---

## 🎨 **UI/UX SPECIFICATIONS**

### **Layout Structure**

```
┌─────────────────────────────────────────────────┐
│ 🔍 GEM SCANNER          [🟢 LIVE] [🔄 Refresh] │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─Logo─┬─Symbol─┬─Price───┬─24h────┬─Cap────┬─AI─┐│
│ │ [🐶] │ BONK   │ $0.0000 │ +45.8% │ $850M  │ 95 ││
│ │ [🐸] │ WEN    │ $0.0056 │ +23.4% │ $450M  │ 88 ││  
│ │ [🐱] │ POPCAT │ $0.8900 │ +67.2% │ $890M  │ 92 ││
│ │ [🐱] │ MEW    │ $0.0123 │ +156%  │ $1.2B  │ 97 ││
│ └─────┴────────┴────────┴────────┴───────┴────┘│
│                                                 │
│ Status: 4 gems found • Last updated: 10s ago   │
└─────────────────────────────────────────────────┘
```

### **Color Scheme (Maintain Mexma Branding)**

```css
/* Primary Colors */
--bg-primary: #1a1a1a;
--border-primary: #404040;
--text-primary: #ffffff;
--text-secondary: #a3a3a3;

/* Status Colors */
--positive: #22c55e;  /* Green for gains */
--negative: #ef4444;  /* Red for losses */
--warning: #f59e0b;   /* Amber for medium risk */

/* AI Score Colors */
--score-excellent: #10b981; /* 90-100 */
--score-good: #3b82f6;      /* 70-89 */
--score-fair: #f59e0b;      /* 50-69 */
--score-poor: #ef4444;      /* 0-49 */
```

---

## 🚀 **IMPLEMENTATION TIMELINE**

### **Day 1: Asset & Foundation Setup**
- ✅ Copy all logo assets from Indian version
- ✅ Create directory structure in `/app/public/`
- ✅ Verify logo loading and fallback systems
- ✅ Test asset serving in development

### **Day 2: Component Development**  
- ✅ Enhance BradleyGemScanner component
- ✅ Implement logo integration system
- ✅ Add data column formatting
- ✅ Integrate AI score display (maintain position)

### **Day 3: API & Data Integration**
- ✅ Configure 4 target MEME coins
- ✅ Enhance API endpoint response format
- ✅ Implement real-time refresh system
- ✅ Add error handling and fallbacks

### **Day 4: Testing & Polish**
- ✅ Cross-browser logo loading tests
- ✅ Mobile responsiveness verification  
- ✅ Performance optimization
- ✅ Final UI/UX polish

---

## ✅ **ACCEPTANCE CRITERIA**

### **Functional Requirements**
- [ ] **4 MEME Coins Displayed**: BONK, WEN, POPCAT, MEW with live data
- [ ] **All Logos Loaded**: Every coin shows proper logo with fallback
- [ ] **Data Columns Complete**: Price, 24h change, market cap, volume, AI score, risk
- [ ] **AI Score Position**: Maintained in current location/format
- [ ] **Real-time Updates**: 10-30 second refresh intervals
- [ ] **Interactive Features**: Copy address, manual refresh, live indicator

### **Technical Requirements**
- [ ] **Logo Assets**: All meme coin logos copied and accessible
- [ ] **Fallback System**: Graceful degradation if logos fail to load
- [ ] **Performance**: Page load under 2 seconds
- [ ] **Mobile Responsive**: Works on all screen sizes
- [ ] **Error Handling**: Graceful API failure management

### **Visual Requirements**  
- [ ] **Consistent Branding**: Matches Mexma dashboard theme
- [ ] **Logo Quality**: Sharp, properly sized logos (40x40px)
- [ ] **Data Formatting**: Professional number formatting with proper precision
- [ ] **Status Indicators**: Clear live status and refresh states
- [ ] **Color Coding**: Intuitive color system for gains/losses/risk

---

## 📊 **SUCCESS METRICS**

### **User Experience**
- **Logo Load Success Rate**: >99% (with fallbacks)
- **Data Refresh Rate**: 10-30 seconds consistent
- **User Interaction**: Copy address, refresh functionality
- **Visual Consistency**: Matches existing Mexma design system

### **Technical Performance**
- **API Response Time**: <500ms average
- **Asset Load Time**: <200ms for logos
- **Memory Usage**: <50MB additional for scanner
- **Error Rate**: <1% for data fetching

### **Data Accuracy**
- **Price Accuracy**: Real-time within 30 seconds
- **AI Score Reliability**: Consistent 5-factor scoring
- **Market Data**: Accurate volume and market cap
- **Logo-Token Matching**: 100% correct logo display

---

## 🔧 **TECHNICAL NOTES**

### **Logo Implementation Strategy**
```typescript
// Bulletproof logo loading with multiple fallbacks
const logoFallbackChain = [
  `/meme-logos/${symbol.toLowerCase()}.svg`,    // Primary
  `/meme-logos/${symbol.toLowerCase()}.png`,    // Secondary  
  `/crypto-logos/${symbol.toLowerCase()}.svg`,  // Tertiary
  'Search icon component'                        // Final fallback
];
```

### **Caching Strategy**
```typescript
const CACHE_CONFIG = {
  logos: { ttl: '24h', immutable: true },
  gemData: { ttl: '30s', staleWhileRevalidate: true },
  apiResponses: { ttl: '10s', backgroundRefresh: true }
};
```

### **Mobile Considerations**
- Logo size scales from 40px to 32px on mobile
- Table becomes scrollable horizontally if needed
- Touch-friendly refresh and copy buttons
- Optimized for thumb navigation

---

## 📁 **FILE STRUCTURE AFTER IMPLEMENTATION**

```
app/
├── public/
│   ├── meme-logos/           # ✅ NEW: All meme coin logos
│   │   ├── bonk.svg
│   │   ├── wen.svg  
│   │   ├── popcat.svg
│   │   ├── mew.svg
│   │   └── ... (6 more)
│   ├── crypto-logos/         # ✅ NEW: Additional crypto logos
│   └── images/
│       └── section-logos/
│           └── gem-scanner.png # ✅ NEW: Scanner icon
├── components/
│   └── gem-scanner/
│       └── bradley-gem-scanner.tsx # ✅ ENHANCED
├── hooks/
│   └── use-gem-data.ts       # ✅ ENHANCED  
└── app/api/
    └── gems/live/
        └── route.ts          # ✅ ENHANCED
```

---

## 🎯 **FINAL DELIVERABLES**

1. **✅ Live Gem Scanner**: 4 MEME coins with real-time data
2. **✅ Complete Logo Integration**: All logos loaded and displaying
3. **✅ AI Score Positioning**: Maintained in current format/location
4. **✅ Data Columns**: Price, change, cap, volume, AI score, risk
5. **✅ Professional UI**: Consistent with Mexma dashboard theme
6. **✅ Mobile Responsive**: Works across all devices
7. **✅ Error Handling**: Graceful fallbacks and error states
8. **✅ Performance Optimized**: Fast loading and smooth updates

**Project Status**: Ready for implementation ✅
**Estimated Duration**: 4 days
**Priority Level**: High (Core feature)
**Dependencies**: Indian version assets (logos, components) 