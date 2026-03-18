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
        <h1 className="text-2xl font-semibold mb-1">Tendencias en YouTube</h1>
        <p className="text-gray-500 text-sm mb-4">
          Lo más visto ahora mismo en cada país
        </p>
        <CountrySelector value={country} onChange={setCountry} />
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-video" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </main>
  )
}