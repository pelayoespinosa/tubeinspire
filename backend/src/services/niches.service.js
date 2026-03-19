import axios from 'axios'

const BASE_URL = 'https://www.googleapis.com/youtube/v3'

const CATEGORIES = {
  gaming: { id: '20', label: 'Gaming' },
  music: { id: '10', label: 'Música' },
  food: { id: '26', label: 'Cocina' },
  tech: { id: '28', label: 'Tecnología' },
  sports: { id: '17', label: 'Deportes' },
  education: { id: '27', label: 'Educación' },
  entertainment: { id: '24', label: 'Entretenimiento' },
  travel: { id: '19', label: 'Viajes' },
}

export { CATEGORIES }

export async function getNicheVideos(categoryKey, regionCode = 'ES') {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const category = CATEGORIES[categoryKey]
  if (!category) throw new Error('Categoría no válida')

  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode,
      videoCategoryId: category.id,
      maxResults: 20,
      key: API_KEY
    }
  })

  const videos = response.data.items.map(video => {
    const views = parseInt(video.statistics.viewCount) || 0
    const likes = parseInt(video.statistics.likeCount) || 0
    const comments = parseInt(video.statistics.commentCount) || 0
    const engagement = views > 0 ? ((likes + comments) / views) * 100 : 0
    const opportunityScore = Math.min(100, Math.round(engagement * 10 + (views / 100000)))

    return {
      id: video.id,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.medium.url,
      views,
      likes,
      comments,
      engagement: engagement.toFixed(2),
      opportunityScore,
      publishedAt: video.snippet.publishedAt
    }
  })

  const avgViews = Math.round(videos.reduce((a, v) => a + v.views, 0) / videos.length)
  const avgEngagement = (videos.reduce((a, v) => a + parseFloat(v.engagement), 0) / videos.length).toFixed(2)
  const topOpportunity = [...videos].sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 3)

  return {
    category: category.label,
    regionCode,
    avgViews,
    avgEngagement,
    topOpportunity,
    videos
  }
}