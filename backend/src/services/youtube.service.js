import axios from 'axios'

const BASE_URL = 'https://www.googleapis.com/youtube/v3'

export async function getTrendingVideos(regionCode = 'ES', maxResults = 20) {
const API_KEY = process.env.YOUTUBE_API_KEY
const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode,
      maxResults,
      key: API_KEY
    }
  })

  return response.data.items.map(video => ({
    id: video.id,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    thumbnail: video.snippet.thumbnails.medium.url,
    views: parseInt(video.statistics.viewCount),
    likes: parseInt(video.statistics.likeCount),
    category: video.snippet.categoryId,
    publishedAt: video.snippet.publishedAt
  }))
}