
import { toast } from 'sonner'

// WebSocket connection states
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'error'

// Data types for real-time streams
export interface CandlestickData {
  symbol: string
  time: string
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  candleColor: string
}

export interface TickerData {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  volume24h: number
  high24h: number
  low24h: number
  timestamp: number
}

export interface TradeData {
  symbol: string
  price: number
  quantity: number
  time: string
  timestamp: number
  isBuyerMaker: boolean
}

export interface OrderBookData {
  symbol: string
  bids: [string, string][]
  asks: [string, string][]
  timestamp: number
}

// WebSocket service class
export class BinanceWebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private subscriptions = new Set<string>()
  private callbacks = new Map<string, Function[]>()
  private connectionStatus: ConnectionStatus = 'disconnected'
  private statusCallbacks: Function[] = []
  private isManualDisconnect = false

  constructor() {
    this.connect()
  }

  // Connect to Binance WebSocket
  private connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return

    this.setConnectionStatus('connecting')
    
    try {
      this.ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker')
      
      this.ws.onopen = () => {
        this.setConnectionStatus('connected')
        this.reconnectAttempts = 0
        console.log('🟢 WebSocket connected to Binance')
        
        // Resubscribe to previous streams
        this.resubscribe()
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.ws.onclose = (event) => {
        console.log('🔴 WebSocket connection closed:', event.code, event.reason)
        
        if (!this.isManualDisconnect) {
          this.setConnectionStatus('reconnecting')
          this.handleReconnect()
        } else {
          this.setConnectionStatus('disconnected')
        }
      }

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error)
        this.setConnectionStatus('error')
        toast.error('WebSocket connection error')
      }

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      this.setConnectionStatus('error')
      this.handleReconnect()
    }
  }

  // Handle reconnection logic
  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.setConnectionStatus('error')
      toast.error('Failed to connect after multiple attempts')
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 30000)
    
    console.log(`🔄 Reconnecting in ${delay/1000}s (attempt ${this.reconnectAttempts})`)
    
    setTimeout(() => {
      this.connect()
    }, delay)
  }

  // Resubscribe to streams after reconnection
  private resubscribe() {
    if (this.subscriptions.size === 0) return

    const streams = Array.from(this.subscriptions)
    this.subscriptions.clear()
    
    streams.forEach(stream => {
      this.subscribe(stream)
    })
  }

  // Subscribe to a stream
  subscribe(stream: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, queuing subscription:', stream)
      this.subscriptions.add(stream)
      return
    }

    this.subscriptions.add(stream)
    
    const subscribeMessage = {
      method: 'SUBSCRIBE',
      params: [stream],
      id: Date.now()
    }

    this.ws.send(JSON.stringify(subscribeMessage))
    console.log('📡 Subscribed to stream:', stream)
  }

  // Unsubscribe from a stream
  unsubscribe(stream: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return

    this.subscriptions.delete(stream)
    
    const unsubscribeMessage = {
      method: 'UNSUBSCRIBE',
      params: [stream],
      id: Date.now()
    }

    this.ws.send(JSON.stringify(unsubscribeMessage))
    console.log('🚫 Unsubscribed from stream:', stream)
  }

  // Handle incoming messages
  private handleMessage(data: any) {
    if (data.stream) {
      const streamName = data.stream
      const streamData = data.data

      // Process different stream types
      if (streamName.includes('@ticker')) {
        this.processTicker(streamData)
      } else if (streamName.includes('@kline')) {
        this.processKline(streamData)
      } else if (streamName.includes('@trade')) {
        this.processTrade(streamData)
      } else if (streamName.includes('@depth')) {
        this.processDepth(streamData)
      }

      // Trigger callbacks for this stream
      this.triggerCallbacks(streamName, streamData)
    }
  }

  // Process ticker data
  private processTicker(data: any) {
    const ticker: TickerData = {
      symbol: data.s,
      price: parseFloat(data.c),
      change24h: parseFloat(data.P),
      changePercent24h: parseFloat(data.P),
      volume24h: parseFloat(data.v),
      high24h: parseFloat(data.h),
      low24h: parseFloat(data.l),
      timestamp: data.E
    }

    this.triggerCallbacks('ticker', ticker)
  }

  // Process kline (candlestick) data
  private processKline(data: any) {
    const kline = data.k
    const candlestick: CandlestickData = {
      symbol: kline.s,
      time: new Date(kline.t).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: kline.t,
      open: parseFloat(kline.o),
      high: parseFloat(kline.h),
      low: parseFloat(kline.l),
      close: parseFloat(kline.c),
      volume: parseFloat(kline.v),
      candleColor: parseFloat(kline.c) > parseFloat(kline.o) ? '#10B981' : '#EF4444'
    }

    this.triggerCallbacks('kline', candlestick)
  }

  // Process trade data
  private processTrade(data: any) {
    const trade: TradeData = {
      symbol: data.s,
      price: parseFloat(data.p),
      quantity: parseFloat(data.q),
      time: new Date(data.T).toLocaleTimeString(),
      timestamp: data.T,
      isBuyerMaker: data.m
    }

    this.triggerCallbacks('trade', trade)
  }

  // Process order book depth data
  private processDepth(data: any) {
    const orderBook: OrderBookData = {
      symbol: data.s || 'BTCUSDT',
      bids: data.b || data.bids || [],
      asks: data.a || data.asks || [],
      timestamp: data.E || Date.now()
    }

    this.triggerCallbacks('depth', orderBook)
  }

  // Add callback for data type
  addCallback(type: string, callback: Function) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, [])
    }
    this.callbacks.get(type)?.push(callback)
  }

  // Remove callback
  removeCallback(type: string, callback: Function) {
    const callbacks = this.callbacks.get(type)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  // Trigger callbacks for a specific type
  private triggerCallbacks(type: string, data: any) {
    const callbacks = this.callbacks.get(type)
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error(`Error in ${type} callback:`, error)
        }
      })
    }
  }

  // Connection status management
  private setConnectionStatus(status: ConnectionStatus) {
    this.connectionStatus = status
    this.statusCallbacks.forEach(callback => {
      try {
        callback(status)
      } catch (error) {
        console.error('Error in status callback:', error)
      }
    })
  }

  // Add status callback
  addStatusCallback(callback: Function) {
    this.statusCallbacks.push(callback)
    // Immediately call with current status
    callback(this.connectionStatus)
  }

  // Remove status callback
  removeStatusCallback(callback: Function) {
    const index = this.statusCallbacks.indexOf(callback)
    if (index !== -1) {
      this.statusCallbacks.splice(index, 1)
    }
  }

  // Get current connection status
  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  // Get active subscriptions
  getSubscriptions(): string[] {
    return Array.from(this.subscriptions)
  }

  // Manual disconnect
  disconnect() {
    this.isManualDisconnect = true
    if (this.ws) {
      this.ws.close()
    }
    this.setConnectionStatus('disconnected')
  }

  // Manual reconnect
  reconnect() {
    this.isManualDisconnect = false
    this.disconnect()
    setTimeout(() => {
      this.connect()
    }, 100)
  }

  // Cleanup
  cleanup() {
    this.disconnect()
    this.callbacks.clear()
    this.statusCallbacks = []
    this.subscriptions.clear()
  }
}

// Singleton instance
let wsServiceInstance: BinanceWebSocketService | null = null

export const getWebSocketService = (): BinanceWebSocketService => {
  if (!wsServiceInstance) {
    wsServiceInstance = new BinanceWebSocketService()
  }
  return wsServiceInstance
}

// Asset configuration
export const SUPPORTED_ASSETS = [
  { 
    symbol: 'BTCUSDT', 
    displaySymbol: 'BTC',
    name: 'Bitcoin', 
    basePrice: 43000 
  },
  { 
    symbol: 'ETHUSDT', 
    displaySymbol: 'ETH',
    name: 'Ethereum', 
    basePrice: 2500 
  },
  { 
    symbol: 'SOLUSDT', 
    displaySymbol: 'SOL',
    name: 'Solana', 
    basePrice: 95 
  },
  { 
    symbol: 'ADAUSDT', 
    displaySymbol: 'ADA',
    name: 'Cardano', 
    basePrice: 0.45 
  }
]

// Timeframe configuration
export const SUPPORTED_TIMEFRAMES = [
  { id: '1m', name: '1 Minute', interval: '1m' },
  { id: '5m', name: '5 Minutes', interval: '5m' },
  { id: '15m', name: '15 Minutes', interval: '15m' },
  { id: '1h', name: '1 Hour', interval: '1h' },
  { id: '4h', name: '4 Hours', interval: '4h' },
  { id: '1d', name: '1 Day', interval: '1d' },
  { id: '1w', name: '1 Week', interval: '1w' }
]

// Stream name generators
export const getTickerStream = (symbol: string) => `${symbol.toLowerCase()}@ticker`
export const getKlineStream = (symbol: string, interval: string) => `${symbol.toLowerCase()}@kline_${interval}`
export const getTradeStream = (symbol: string) => `${symbol.toLowerCase()}@trade`
export const getDepthStream = (symbol: string) => `${symbol.toLowerCase()}@depth20@1000ms`
