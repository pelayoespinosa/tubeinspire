import { useState } from 'react'
import { fetchNiches } from '../services/api'

const CATEGORIES = [
  { key: 'gaming', label: 'Gaming', icon: '🎮' },
  { key: 'music', label: 'Música', icon: '🎵' },
  { key: 'food', label: 'Cocina', icon: '🍳' },
  { key: 'tech', label: 'Tecnología', icon: '💻' },
  { key: 'sports', label: 'Deportes', icon: '⚽' },
  { key: 'education', label: 'Educación', icon: '📚' },
  { key: 'entertainment', label: 'Entretenimiento', icon: '🎬' },
  { key: 'travel', label: 'Viajes', icon: '✈️' },
]

const COUNTRIES = [
  { code: 'ES', flag: '🇪🇸' },
  { code: 'US', flag: '🇺🇸' },
  { code: 'MX', flag: '🇲🇽' },
  { code: 'AR', flag: '🇦🇷' },
  { code: 'GB', flag: '🇬🇧' },
  { code: 'BR', flag: '🇧🇷' },
  { code: 'DE', flag: '🇩🇪' },
]

function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

function ScoreBar({ score }) {
  const color = score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-700 rounded-full h-1.5">
        <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-6">{score}</span>
    </div>
  )
}

export default function Niches() {
  const [category, setCategory] = useState(null)
  const [country, setCountry] = useState('ES')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSelect(key) {
    setCategory(key)
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await fetchNiches(key, country)
      setData(res.data)
    } catch {
      setError('No se pudieron cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  async function handleCountry(code) {
    setCountry(code)
    if (category) handleSelect(category)
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <span className="text-red-500 text-sm font-medium uppercase tracking-wider">Análisis</span>
        <h1 className="text-3xl font-bold text-white mb-2">Buscador de nichos</h1>
        <p className="text-gray-400 text-sm">Encuentra qué categorías tienen más oportunidad en cada país</p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {COUNTRIES.map(c => (
          <button
            key={c.code}
            onClick={() => handleCountry(c.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5
              ${country === c.code
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
          >
            {c.flag} {c.code}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => handleSelect(c.key)}
            className={`p-4 rounded-xl border text-left transition-all
              ${category === c.key
                ? 'bg-red-500/10 border-red-500/50 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
          >
            <span className="text-2xl block mb-2">{c.icon}</span>
            <span className="text-sm font-medium">{c.label}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl h-16 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {data && !loading && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Media de vistas</p>
              <p className="text-white text-2xl font-bold">{formatViews(data.avgViews)}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Engagement medio</p>
              <p className="text-white text-2xl font-bold">{data.avgEngagement}%</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Top oportunidad</p>
              <p className="text-white text-sm font-medium line-clamp-1">{data.topOpportunity[0]?.title}</p>
            </div>
          </div>

          <h2 className="text-white font-semibold mb-4">Vídeos analizados</h2>
          <div className="flex flex-col gap-3">
            {data.videos.map((video, i) => (
              <div key={video.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-4">
                <span className="text-gray-500 text-sm w-5">#{i + 1}</span>
                <img src={video.thumbnail} alt={video.title} className="w-20 aspect-video object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium line-clamp-1 mb-1">{video.title}</p>
                  <p className="text-gray-400 text-xs">{video.channel}</p>
                </div>
                <div className="text-right min-w-24">
                  <p className="text-white text-sm font-medium">{formatViews(video.views)} vistas</p>
                  <p className="text-gray-400 text-xs">{video.engagement}% engagement</p>
                </div>
                <div className="w-32">
                  <p className="text-gray-400 text-xs mb-1">Oportunidad</p>
                  <ScoreBar score={video.opportunityScore} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!data && !loading && !error && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">Selecciona una categoría para analizar su nicho</p>
        </div>
      )}
    </main>
  )
}