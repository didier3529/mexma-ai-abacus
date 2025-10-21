
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  GitBranch,
  Code,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react'
import GitCommitsChart from './git-commits-chart'
import DeveloperActivityChart from './developer-activity-chart'
import CodeQualityChart from './code-quality-chart'

// Mock development data
const developmentMetrics = [
  {
    project: 'Ethereum',
    symbol: 'ETH',
    commits7d: 287,
    commitsChange: 12.4,
    developers: 156,
    devChange: 8.7,
    stars: 45670,
    forks: 23456,
    issues: 847,
    codeQuality: 92,
    roadmapProgress: 78,
    lastRelease: '2 days ago'
  },
  {
    project: 'Solana',
    symbol: 'SOL',
    commits7d: 234,
    commitsChange: 18.9,
    developers: 89,
    devChange: 15.3,
    stars: 12890,
    forks: 5467,
    issues: 423,
    codeQuality: 88,
    roadmapProgress: 85,
    lastRelease: '5 days ago'
  },
  {
    project: 'Polygon',
    symbol: 'MATIC',
    commits7d: 156,
    commitsChange: -3.2,
    developers: 67,
    devChange: 4.1,
    stars: 8934,
    forks: 3245,
    issues: 234,
    codeQuality: 85,
    roadmapProgress: 72,
    lastRelease: '1 week ago'
  },
  {
    project: 'Cardano',
    symbol: 'ADA',
    commits7d: 134,
    commitsChange: 7.8,
    developers: 78,
    devChange: -2.1,
    stars: 23456,
    forks: 8765,
    issues: 567,
    codeQuality: 90,
    roadmapProgress: 65,
    lastRelease: '3 weeks ago'
  },
  {
    project: 'Avalanche',
    symbol: 'AVAX',
    commits7d: 198,
    commitsChange: 25.6,
    developers: 94,
    devChange: 22.3,
    stars: 6789,
    forks: 2134,
    issues: 345,
    codeQuality: 87,
    roadmapProgress: 80,
    lastRelease: '4 days ago'
  }
]

function getQualityColor(score: number): string {
  if (score >= 90) return 'border-green-500/30 text-green-400'
  if (score >= 80) return 'border-yellow-500/30 text-yellow-400'
  return 'border-red-500/30 text-red-400'
}

function getProgressColor(progress: number): string {
  if (progress >= 80) return 'border-green-500/30 text-green-400'
  if (progress >= 70) return 'border-blue-500/30 text-blue-400'
  return 'border-orange-500/30 text-orange-400'
}

export default function DevelopmentActivity() {
  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-orange-500" />
              <span>Git Commits</span>
            </CardTitle>
            <CardDescription>Weekly commit activity</CardDescription>
          </CardHeader>
          <CardContent>
            <GitCommitsChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-500" />
              <span>Developer Growth</span>
            </CardTitle>
            <CardDescription>Active developer trends</CardDescription>
          </CardHeader>
          <CardContent>
            <DeveloperActivityChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-orange-500" />
              <span>Code Quality</span>
            </CardTitle>
            <CardDescription>Repository health scores</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeQualityChart />
          </CardContent>
        </Card>
      </div>

      {/* Development Metrics Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-orange-500" />
            <span>Development Activity Analysis</span>
          </CardTitle>
          <CardDescription>Comprehensive development metrics across major protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Project</th>
                  <th className="text-right py-3 px-2">Commits (7d)</th>
                  <th className="text-right py-3 px-2">Developers</th>
                  <th className="text-right py-3 px-2">GitHub Stars</th>
                  <th className="text-right py-3 px-2">Issues</th>
                  <th className="text-right py-3 px-2">Code Quality</th>
                  <th className="text-right py-3 px-2">Roadmap</th>
                  <th className="text-right py-3 px-2">Last Release</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {developmentMetrics.map((project) => (
                  <tr key={project.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{project.project}</div>
                        <div className="text-gray-400 text-xs">{project.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">{project.commits7d}</div>
                      <div className={`text-xs flex items-center justify-end space-x-1 ${
                        project.commitsChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {project.commitsChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(project.commitsChange).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">{project.developers}</div>
                      <div className={`text-xs flex items-center justify-end space-x-1 ${
                        project.devChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {project.devChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(project.devChange).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end space-x-1 text-white">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="font-mono">{project.stars.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {project.issues}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getQualityColor(project.codeQuality)}
                      >
                        {project.codeQuality}/100
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getProgressColor(project.roadmapProgress)}
                      >
                        {project.roadmapProgress}%
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-300 text-xs">
                      {project.lastRelease}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <GitBranch className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Commits (7d)</div>
                <div className="text-2xl font-bold text-white">1,009</div>
                <div className="text-xs text-green-400">+11.8% from last week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Developers</div>
                <div className="text-2xl font-bold text-white">484</div>
                <div className="text-xs text-blue-400">Across all projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Code className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Code Quality</div>
                <div className="text-2xl font-bold text-white">88.4</div>
                <div className="text-xs text-green-400">High standard</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Roadmap</div>
                <div className="text-2xl font-bold text-white">76%</div>
                <div className="text-xs text-yellow-400">On track</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
