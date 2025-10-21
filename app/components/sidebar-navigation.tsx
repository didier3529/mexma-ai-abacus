'use client'

import {
    Activity,
    AlertTriangle,
    Banknote,
    BarChart3,
    Bot,
    Brain,
    ChevronDown,
    ChevronRight,
    Coins,
    Eye,
    GitBranch,
    Home,
    Menu,
    Network,
    Search,
    Shield,
    TrendingUp,
    X,
    Zap
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export interface NavigationItem {
  id: string
  name: string
  icon: React.ComponentType<any>
  component?: React.ComponentType<any>
  children?: NavigationItem[]
}

export interface SidebarNavigationProps {
  navigationItems: NavigationItem[]
  activeSection: string
  onSectionChange: (sectionId: string) => void
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

export default function SidebarNavigation({
  navigationItems,
  activeSection,
  onSectionChange,
  isMobileMenuOpen,
  onMobileMenuToggle
}: SidebarNavigationProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['overview'])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      toggleCategory(item.id)
    } else {
      onSectionChange(item.id)
      // Close mobile menu when item is selected
      if (isMobileMenuOpen) {
        onMobileMenuToggle()
      }
    }
  }

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isExpanded = expandedCategories.includes(item.id)
    const isActive = activeSection === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${
            level === 0 ? "font-medium" : "font-normal text-sm"
          } ${
            level > 0 && "ml-4 pl-8"
          } ${
            isActive 
              ? "bg-orange-500/20 text-orange-400 border-l-2 border-orange-500" 
              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
          } ${
            hasChildren && level === 0 && "mb-1"
          }`}
        >
          <div className="flex items-center space-x-3">
            {item.icon && (
              <item.icon className={`w-5 h-5 ${
                isActive ? "text-orange-400" : "text-gray-400"
              }`} />
            )}
            <span>{item.name}</span>
          </div>
          
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )
          )}
        </button>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-gray-900 rounded-lg border border-gray-700"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 z-50 transition-transform duration-300 w-72 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 p-6 border-b border-gray-800">
            <div className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden rounded-lg">
              <Image
                src="/mexma-logo.jpg"
                alt="MEXMA Logo"
                width={48}
                height={48}
                className="object-cover w-full h-full rounded-lg"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">MEXMA</h1>
              <p className="text-xs text-gray-400">CRYPTO INTELLIGENCE</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map(item => renderNavigationItem(item))}
          </nav>

          {/* Status Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Feed Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// Export the navigation configuration
export const navigationConfig: NavigationItem[] = [
  {
    id: 'overview',
    name: 'Dashboard Overview',
    icon: Home,
  },
  {
    id: 'live-data-analysis',
    name: 'Live Data Analysis',
    icon: Activity,
    children: [
      {
        id: 'gem-scanner',
        name: 'Gem Scanner',
        icon: Search,
      },
      {
        id: 'market-intelligence',
        name: 'Market Intelligence',
        icon: TrendingUp,
      }
    ]
  },
  {
    id: 'trading-predictions',
    name: 'Trading & Predictions',
    icon: TrendingUp,
    children: [
      {
        id: 'ai-predictions',
        name: 'AI Price Predictions',
        icon: Brain,
      },
      {
        id: 'market-microstructure',
        name: 'Market Microstructure',
        icon: BarChart3,
      },
      {
        id: 'derivatives-intelligence',
        name: 'Derivatives Intelligence',
        icon: Activity,
      }
    ]
  },
  {
    id: 'intelligence-security',
    name: 'Intelligence & Security',
    icon: Shield,
    children: [
      {
        id: 'whale-intelligence',
        name: 'Whale Intelligence',
        icon: Eye,
      },
      {
        id: 'threat-intelligence',
        name: 'Threat Intelligence',
        icon: AlertTriangle,
      },
      {
        id: 'ai-sentiment',
        name: 'AI-Powered Sentiment',
        icon: Bot,
      }
    ]
  },
  {
    id: 'defi-yield',
    name: 'DeFi & Yield',
    icon: Coins,
    children: [
      {
        id: 'defi-monitoring',
        name: 'DeFi Protocol Monitoring',
        icon: Activity,
      },
      {
        id: 'defi-yield-intelligence',
        name: 'DeFi Yield Intelligence',
        icon: Banknote,
      },
      {
        id: 'mev-analytics',
        name: 'MEV Analytics',
        icon: Zap,
      }
    ]
  },
  {
    id: 'network-flow',
    name: 'Network & Flow Analysis',
    icon: Network,
    children: [
      {
        id: 'network-visualization',
        name: 'Network Flow Visualization',
        icon: GitBranch,
      },
      {
        id: 'cross-chain-liquidity',
        name: 'Cross-Chain Liquidity',
        icon: Network,
      }
    ]
  },
  {
    id: 'market-research',
    name: 'Market Research',
    icon: Search,
    children: [
      {
        id: 'fundamental-analysis',
        name: 'Fundamental Analysis Dashboard',
        icon: BarChart3,
      },
      {
        id: 'technical-analysis',
        name: 'Technical Analysis Tool',
        icon: Activity,
      }
    ]
  }
]
