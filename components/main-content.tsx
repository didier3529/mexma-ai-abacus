
'use client'

import { useState } from 'react'
import BreadcrumbNavigation from './breadcrumb-navigation'
import DashboardOverview from './dashboard-overview'
import SidebarNavigation, { navigationConfig } from './sidebar-navigation'

// Import all the existing components
import AIMarketSentiment from './ai-market-sentiment'
import CrossChainLiquidity from './cross-chain-liquidity'
import CrossChainThreat from './cross-chain-threat'
import DeFiMonitoring from './defi-monitoring'
import DeFiYieldIntelligence from './defi-yield-intelligence'
import DerivativesOptionsIntelligence from './derivatives-options-intelligence'
import FundamentalAnalysisBoard from './fundamental-analysis-dashboard'
import MarketMicrostructureAnalytics from './market-microstructure-analytics'
import MEVAnalytics from './mev-analytics'
import NetworkFlowVisualization from './network-flow-visualization'
import PredictiveInsights from './predictive-insights'
import TechnicalAnalysisTool from './technical-analysis-tool'
import ThreatAlerts from './threat-alerts'
import WhaleIntelligence from './whale-intelligence'

// Import the new components that work
import { BradleyGemScanner } from './gem-scanner/bradley-gem-scanner'
import DirectPriceDisplay from './market-intelligence/direct-price-display'

export default function MainContent() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview onSectionChange={handleSectionChange} />
      
      case 'live-data-analysis':
        return <DashboardOverview onSectionChange={handleSectionChange} />
      
      // Trading & Predictions
      case 'ai-predictions':
        return <PredictiveInsights />
      case 'market-microstructure':
        return <MarketMicrostructureAnalytics />
      case 'derivatives-intelligence':
        return <DerivativesOptionsIntelligence />
      
      // Intelligence & Security
      case 'whale-intelligence':
        return <WhaleIntelligence />
      case 'threat-intelligence':
        return (
          <div className="space-y-8">
            <ThreatAlerts />
            <CrossChainThreat />
          </div>
        )
      case 'ai-sentiment':
        return <AIMarketSentiment />
      
      // DeFi & Yield
      case 'defi-monitoring':
        return <DeFiMonitoring />
      case 'defi-yield-intelligence':
        return <DeFiYieldIntelligence />
      case 'mev-analytics':
        return <MEVAnalytics />
      
      // Network & Flow Analysis
      case 'network-visualization':
        return <NetworkFlowVisualization />
      case 'cross-chain-liquidity':
        return <CrossChainLiquidity />
      
      // Market Research
      case 'fundamental-analysis':
        return <FundamentalAnalysisBoard />
      case 'technical-analysis':
        return <TechnicalAnalysisTool />
      
      // Live Data Analysis - NEW SECTIONS PROPERLY INTEGRATED
      case 'gem-scanner':
        return <BradleyGemScanner />
      case 'market-intelligence':
        return <DirectPriceDisplay />
      
      default:
        return <DashboardOverview onSectionChange={handleSectionChange} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <SidebarNavigation
          navigationItems={navigationConfig}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNavigation
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            {/* Dynamic Content */}
            <div className="space-y-8">
              {renderActiveSection()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
