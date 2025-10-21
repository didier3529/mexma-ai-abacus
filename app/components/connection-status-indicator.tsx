
'use client'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Wifi, 
  WifiOff, 
  Loader2, 
  AlertTriangle, 
  RefreshCw 
} from 'lucide-react'
import { useConnectionStatus } from '../hooks/use-websocket-data'

export default function ConnectionStatusIndicator() {
  const { status, reconnectAttempts, isConnected, isConnecting, hasError, reconnect } = useConnectionStatus()

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Connected',
          color: 'bg-green-500/20 text-green-400 border-green-500',
          pulse: false
        }
      case 'connecting':
        return {
          icon: Loader2,
          text: 'Connecting...',
          color: 'bg-blue-500/20 text-blue-400 border-blue-500',
          pulse: true
        }
      case 'reconnecting':
        return {
          icon: RefreshCw,
          text: `Reconnecting... (${reconnectAttempts})`,
          color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
          pulse: true
        }
      case 'error':
        return {
          icon: AlertTriangle,
          text: 'Connection Error',
          color: 'bg-red-500/20 text-red-400 border-red-500',
          pulse: false
        }
      default:
        return {
          icon: WifiOff,
          text: 'Disconnected',
          color: 'bg-gray-500/20 text-gray-400 border-gray-500',
          pulse: false
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className={`${config.color} flex items-center space-x-1`}>
        <Icon 
          className={`h-3 w-3 ${config.pulse ? 'animate-spin' : ''} ${
            status === 'connected' ? 'animate-pulse' : ''
          }`} 
        />
        <span className="text-xs font-medium">{config.text}</span>
      </Badge>
      
      {hasError && (
        <Button
          size="sm"
          variant="outline"
          onClick={reconnect}
          className="border-red-500 text-red-400 hover:bg-red-500/10 h-6 px-2 text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      )}
    </div>
  )
}
