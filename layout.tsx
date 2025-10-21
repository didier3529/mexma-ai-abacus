
import { QueryProvider } from '@/components/providers/query-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEXMA - Crypto Analytics Intelligence',
  description: 'NFT & DeFi surveillance | Blockchain threat intel | Price prediction & Smart calls Built for watchdogs, traders & truth seekers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryProvider>
          <div className="min-h-screen bg-black">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
