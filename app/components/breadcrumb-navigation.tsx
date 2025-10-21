
'use client'

import { ChevronRight, Home } from 'lucide-react'
import { navigationConfig } from './sidebar-navigation'

interface BreadcrumbNavigationProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function BreadcrumbNavigation({ activeSection, onSectionChange }: BreadcrumbNavigationProps) {
  const findSectionPath = (sectionId: string): { id: string; name: string }[] => {
    if (sectionId === 'overview') {
      return [{ id: 'overview', name: 'Dashboard Overview' }]
    }

    for (const category of navigationConfig) {
      if (category.children) {
        for (const item of category.children) {
          if (item.id === sectionId) {
            return [
              { id: category.id, name: category.name },
              { id: item.id, name: item.name }
            ]
          }
        }
      } else if (category.id === sectionId) {
        return [{ id: category.id, name: category.name }]
      }
    }

    return [{ id: 'overview', name: 'Dashboard Overview' }]
  }

  const breadcrumbPath = findSectionPath(activeSection)

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <button
        onClick={() => onSectionChange('overview')}
        className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      {breadcrumbPath.map((item, index) => (
        <div key={item.id} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <button
            onClick={() => onSectionChange(item.id)}
            className={`hover:text-orange-400 transition-colors ${
              index === breadcrumbPath.length - 1 
                ? 'text-orange-400 font-medium' 
                : 'text-gray-400'
            }`}
          >
            {item.name}
          </button>
        </div>
      ))}
    </nav>
  )
}
