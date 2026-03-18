function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M vistas`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K vistas`
  return `${n} vistas`
}

export default function VideoCard({ video }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-3">
        <p className="font-medium text-sm leading-snug line-clamp-2 mb-2">
          {video.title}
        </p>
        <p className="text-xs text-gray-500">{video.channel}</p>
        <p className="text-xs text-gray-400 mt-1">{formatViews(video.views)}</p>
      </div>
    </div>
  )
}