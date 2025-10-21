
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  getWebSocketService, 
  BinanceWebSocketService,
  ConnectionStatus,
  CandlestickData,
  TickerData,
  TradeData,
  OrderBookData,
  SUPPORTED_ASSETS,
  getTickerStream,
  getKlineStream,
  getTradeStream,
  getDepthStream
} from '../lib/websocket-service'

// Hook for connection status
export const useConnectionStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const wsService = useRef<BinanceWebSocketService>()

  useEffect(() => {
    wsService.current = getWebSocketService()
    
    const statusCallback = (newStatus: ConnectionStatus) => {
      setStatus(newStatus)
      if (newStatus === 'connected') {
        setReconnectAttempts(0)
      } else if (newStatus === 'reconnecting') {
        setReconnectAttempts(prev => prev + 1)
      }
    }

    wsService.current.addStatusCallback(statusCallback)

    return () => {
      wsService.current?.removeStatusCallback(statusCallback)
    }
  }, [])

  const reconnect = useCallback(() => {
    wsService.current?.reconnect()
  }, [])

  const disconnect = useCallback(() => {
    wsService.current?.disconnect()
  }, [])

  return {
    status,
    reconnectAttempts,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting' || status === 'reconnecting',
    hasError: status === 'error',
    reconnect,
    disconnect
  }
}

// Hook for real-time ticker data
export const useTickerData = (symbol: string = 'BTCUSDT') => {
  const [tickerData, setTickerData] = useState<TickerData | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const wsService = useRef<BinanceWebSocketService>()

  useEffect(() => {
    wsService.current = getWebSocketService()
    
    const tickerCallback = (data: TickerData) => {
      if (data.symbol === symbol) {
        setTickerData(data)
        setLastUpdate(new Date())
      }
    }

    wsService.current.addCallback('ticker', tickerCallback)
    wsService.current.subscribe(getTickerStream(symbol))

    return () => {
      wsService.current?.removeCallback('ticker', tickerCallback)
      wsService.current?.unsubscribe(getTickerStream(symbol))
    }
  }, [symbol])

  return {
    tickerData,
    lastUpdate,
    price: tickerData?.price || 0,
    change24h: tickerData?.change24h || 0,
    changePercent24h: tickerData?.changePercent24h || 0,
    volume24h: tickerData?.volume24h || 0,
    high24h: tickerData?.high24h || 0,
    low24h: tickerData?.low24h || 0
  }
}

// Hook for real-time candlestick data
export const useCandlestickData = (symbol: string = 'BTCUSDT', timeframe: string = '1h') => {
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([])
  const [currentCandle, setCurrentCandle] = useState<CandlestickData | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const wsService = useRef<BinanceWebSocketService>()
  const maxDataPoints = 100

  // Initialize with historical data simulation
  useEffect(() => {
    const asset = SUPPORTED_ASSETS.find(a => a.symbol === symbol)
    const basePrice = asset?.basePrice || 43000
    
    const initialData: CandlestickData[] = []
    let currentPrice = basePrice
    
    for (let i = 0; i < maxDataPoints; i++) {
      const change = (Math.random() - 0.5) * basePrice * 0.02
      const open = currentPrice
      const close = currentPrice + change
      const high = Math.max(open, close) + Math.random() * basePrice * 0.01
      const low = Math.min(open, close) - Math.random() * basePrice * 0.01
      const volume = Math.random() * 1000000 + 500000
      
      initialData.push({
        symbol,
        time: new Date(Date.now() - (maxDataPoints - i) * 60000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: Date.now() - (maxDataPoints - i) * 60000,
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume: Math.round(volume),
        candleColor: close > open ? '#10B981' : '#EF4444'
      })
      
      currentPrice = close
    }
    
    setCandlestickData(initialData)
  }, [symbol, maxDataPoints])

  useEffect(() => {
    wsService.current = getWebSocketService()
    
    const klineCallback = (data: CandlestickData) => {
      if (data.symbol === symbol) {
        setCurrentCandle(data)
        setLastUpdate(new Date())
        
        // Update candlestick data
        setCandlestickData(prev => {
          const newData = [...prev]
          
          // Check if this is an update to the last candle or a new candle
          const lastCandle = newData[newData.length - 1]
          if (lastCandle && Math.abs(lastCandle.timestamp - data.timestamp) < 60000) {
            // Update existing candle
            newData[newData.length - 1] = data
          } else {
            // Add new candle and maintain max data points
            newData.push(data)
            if (newData.length > maxDataPoints) {
              newData.shift()
            }
          }
          
          return newData
        })
      }
    }

    const streamName = getKlineStream(symbol, timeframe)
    wsService.current.addCallback('kline', klineCallback)
    wsService.current.subscribe(streamName)

    return () => {
      wsService.current?.removeCallback('kline', klineCallback)
      wsService.current?.unsubscribe(streamName)
    }
  }, [symbol, timeframe, maxDataPoints])

  return {
    candlestickData,
    currentCandle,
    lastUpdate,
    latestPrice: currentCandle?.close || candlestickData[candlestickData.length - 1]?.close || 0,
    priceChange: currentCandle ? (currentCandle.close - currentCandle.open) : 0
  }
}

// Hook for real-time trades
export const useTradeData = (symbol: string = 'BTCUSDT') => {
  const [trades, setTrades] = useState<TradeData[]>([])
  const [lastTrade, setLastTrade] = useState<TradeData | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const wsService = useRef<BinanceWebSocketService>()
  const maxTrades = 50

  useEffect(() => {
    wsService.current = getWebSocketService()
    
    const tradeCallback = (data: TradeData) => {
      if (data.symbol === symbol) {
        setLastTrade(data)
        setLastUpdate(new Date())
        
        setTrades(prev => {
          const newTrades = [data, ...prev]
          return newTrades.slice(0, maxTrades)
        })
      }
    }

    wsService.current.addCallback('trade', tradeCallback)
    wsService.current.subscribe(getTradeStream(symbol))

    return () => {
      wsService.current?.removeCallback('trade', tradeCallback)
      wsService.current?.unsubscribe(getTradeStream(symbol))
    }
  }, [symbol, maxTrades])

  const buyVolume = trades.filter(trade => !trade.isBuyerMaker).reduce((sum, trade) => sum + trade.quantity, 0)
  const sellVolume = trades.filter(trade => trade.isBuyerMaker).reduce((sum, trade) => sum + trade.quantity, 0)

  return {
    trades,
    lastTrade,
    lastUpdate,
    buyVolume,
    sellVolume,
    totalVolume: buyVolume + sellVolume,
    buyPressure: (buyVolume / (buyVolume + sellVolume)) * 100 || 0
  }
}

// Hook for order book data
export const useOrderBookData = (symbol: string = 'BTCUSDT') => {
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const wsService = useRef<BinanceWebSocketService>()

  useEffect(() => {
    wsService.current = getWebSocketService()
    
    const depthCallback = (data: OrderBookData) => {
      if (data.symbol === symbol) {
        setOrderBook(data)
        setLastUpdate(new Date())
      }
    }

    wsService.current.addCallback('depth', depthCallback)
    wsService.current.subscribe(getDepthStream(symbol))

    return () => {
      wsService.current?.removeCallback('depth', depthCallback)
      wsService.current?.unsubscribe(getDepthStream(symbol))
    }
  }, [symbol])

  const bestBid = orderBook?.bids?.[0] ? parseFloat(orderBook.bids[0][0]) : 0
  const bestAsk = orderBook?.asks?.[0] ? parseFloat(orderBook.asks[0][0]) : 0
  const spread = bestAsk - bestBid
  const spreadPercent = spread / bestBid * 100

  return {
    orderBook,
    lastUpdate,
    bestBid,
    bestAsk,
    spread,
    spreadPercent,
    bidDepth: orderBook?.bids?.slice(0, 10) || [],
    askDepth: orderBook?.asks?.slice(0, 10) || []
  }
}

// Hook for technical indicators calculation
export const useTechnicalIndicators = (candlestickData: CandlestickData[], period: number = 14) => {
  const [indicators, setIndicators] = useState({
    rsi: 0,
    sma: 0,
    ema: 0,
    macd: { macd: 0, signal: 0, histogram: 0 },
    bollingerBands: { upper: 0, middle: 0, lower: 0 },
    stochastic: { k: 0, d: 0 }
  })

  useEffect(() => {
    if (candlestickData.length < period) return

    const closes = candlestickData.map(d => d.close)
    const highs = candlestickData.map(d => d.high)
    const lows = candlestickData.map(d => d.low)

    // RSI Calculation
    const calculateRSI = (prices: number[], period: number) => {
      if (prices.length < period + 1) return 50
      
      let gains = 0
      let losses = 0
      
      for (let i = 1; i <= period; i++) {
        const change = prices[prices.length - i] - prices[prices.length - i - 1]
        if (change > 0) gains += change
        else losses -= change
      }
      
      const avgGain = gains / period
      const avgLoss = losses / period
      const rs = avgGain / (avgLoss === 0 ? 0.01 : avgLoss)
      
      return 100 - (100 / (1 + rs))
    }

    // SMA Calculation
    const calculateSMA = (prices: number[], period: number) => {
      if (prices.length < period) return prices[prices.length - 1] || 0
      const sum = prices.slice(-period).reduce((a, b) => a + b, 0)
      return sum / period
    }

    // EMA Calculation
    const calculateEMA = (prices: number[], period: number) => {
      if (prices.length < period) return prices[prices.length - 1] || 0
      const multiplier = 2 / (period + 1)
      let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period
      
      for (let i = period; i < prices.length; i++) {
        ema = (prices[i] * multiplier) + (ema * (1 - multiplier))
      }
      
      return ema
    }

    // MACD Calculation
    const calculateMACD = (prices: number[]) => {
      const ema12 = calculateEMA(prices, 12)
      const ema26 = calculateEMA(prices, 26)
      const macd = ema12 - ema26
      
      // Simple signal line approximation
      const signal = macd * 0.8
      const histogram = macd - signal
      
      return { macd, signal, histogram }
    }

    // Bollinger Bands Calculation
    const calculateBollingerBands = (prices: number[], period: number, stdDev: number = 2) => {
      const sma = calculateSMA(prices, period)
      const recentPrices = prices.slice(-period)
      
      const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period
      const standardDeviation = Math.sqrt(variance)
      
      return {
        upper: sma + (standardDeviation * stdDev),
        middle: sma,
        lower: sma - (standardDeviation * stdDev)
      }
    }

    // Stochastic Oscillator
    const calculateStochastic = (highs: number[], lows: number[], closes: number[], period: number = 14) => {
      if (closes.length < period) return { k: 50, d: 50 }
      
      const recentHighs = highs.slice(-period)
      const recentLows = lows.slice(-period)
      const currentClose = closes[closes.length - 1]
      
      const highest = Math.max(...recentHighs)
      const lowest = Math.min(...recentLows)
      
      const k = ((currentClose - lowest) / (highest - lowest)) * 100
      const d = k * 0.9 // Simplified D calculation
      
      return { k, d }
    }

    setIndicators({
      rsi: calculateRSI(closes, period),
      sma: calculateSMA(closes, period),
      ema: calculateEMA(closes, period),
      macd: calculateMACD(closes),
      bollingerBands: calculateBollingerBands(closes, period),
      stochastic: calculateStochastic(highs, lows, closes, period)
    })
  }, [candlestickData, period])

  return indicators
}

// Cleanup hook
export const useWebSocketCleanup = () => {
  useEffect(() => {
    return () => {
      const wsService = getWebSocketService()
      wsService.cleanup()
    }
  }, [])
}
