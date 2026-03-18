function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M vistas`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K vistas`
  return `${n} vistas`
}

export default function VideoCard({ video, index }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-0.5">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded-md">
          #{index + 1}
        </div>
      </div>
      <div className="p-3">
        <p className="font-medium text-sm leading-snug line-clamp-2 mb-2 text-white group-hover:text-red-400 transition-colors">
          {video.title}
        </p>
        <p className="text-xs text-gray-400">{video.channel}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">{formatViews(video.views)}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>♥</span>
            <span>{formatViews(video.likes)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}