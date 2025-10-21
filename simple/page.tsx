export default function SimplePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          MEXMA - Crypto Analytics Intelligence
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Gem Scanner</h2>
            <p className="text-gray-300">
              Real-time Solana gem discovery with AI scoring
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Market Intelligence</h2>
            <p className="text-gray-300">
              Live crypto price data and market analysis
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Analytics Dashboard</h2>
            <p className="text-gray-300">
              Comprehensive crypto analytics and insights
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Deployment successful! The app is working properly.
          </p>
        </div>
      </div>
    </div>
  )
}
