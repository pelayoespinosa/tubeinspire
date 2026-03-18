import { Router } from 'express'
import { getTrends } from '../controllers/trends.controller.js'

const router = Router()

router.get('/', getTrends)

export default router