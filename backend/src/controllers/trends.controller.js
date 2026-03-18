import { getTrendingVideos } from '../services/youtube.service.js'

export async function getTrends(req, res) {
  try {
    const { country = 'ES' } = req.query
    const videos = await getTrendingVideos(country)
    res.json({ success: true, country, data: videos })
  } catch (error) {
    console.error('Error completo:', JSON.stringify(error.response?.data, null, 2))
    res.status(500).json({ success: false, error: 'Error al obtener tendencias' })
  }
}