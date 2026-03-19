import { getNicheVideos, CATEGORIES } from '../services/niches.service.js'

export async function getNiches(req, res) {
  try {
    const { category, country = 'ES' } = req.query
    if (!category) {
      return res.json({ success: true, categories: Object.keys(CATEGORIES) })
    }
    const data = await getNicheVideos(category, country)
    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching niches:', error.message)
    res.status(500).json({ success: false, error: 'Error al obtener nichos' })
  }
}