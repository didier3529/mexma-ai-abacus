
'use client'

import { Shield, Activity, TrendingUp, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

export default function DashboardHeader() {
  return (
    <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden rounded-lg">
              <Image
                src="/mexma-logo.jpg?v=3"
                alt="MEXMA Logo"
                width={56}
                height={56}
                className="object-cover w-full h-full rounded-lg"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold mexma-text-gradient">MEXMA</h1>
              <p className="text-sm text-gray-400">CRYPTO ANALYTICS INTELLIGENCE</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Live Feed</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">Threats: </span>
                <span className="text-red-400 font-semibold">12 Active</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">Protocols: </span>
                <span className="text-green-400 font-semibold">247 Monitored</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">Signals: </span>
                <span className="text-blue-400 font-semibold">8 Buy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
