export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎉 Mexma AI Abacus is Working!
        </h1>
        <p className="text-gray-300 mb-8">
          If you can see this page, the deployment is successful.
        </p>
        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
          <p className="text-green-300">
            ✅ Next.js App Router working<br/>
            ✅ Vercel deployment successful<br/>
            ✅ Routing functional
          </p>
        </div>
      </div>
    </div>
  )
}
