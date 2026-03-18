import { useState, useEffect } from 'react'
import { fetchTrends } from '../services/api'
import VideoCard from '../components/VideoCard'
import CountrySelector from '../components/CountrySelector'

export default function Home() {
  const [videos, setVideos] = useState([])
  const [country, setCountry] = useState('ES')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchTrends(country)
      .then(res => setVideos(res.data))
      .catch(() => setError('No se pudieron cargar las tendencias'))
      .finally(() => setLoading(false))
  }, [country])

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-red-500 text-sm font-medium uppercase tracking-wider">En tiempo real</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Tendencias en YouTube</h1>
        <p className="text-gray-400 text-sm mb-6">
          Los vídeos más vistos ahora mismo — inspírate para tu próximo contenido
        </p>
        <CountrySelector value={country} onChange={setCountry} />
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-gray-800 animate-pulse aspect-video" />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-gray-500 text-xs mb-4">{videos.length} vídeos trending</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}