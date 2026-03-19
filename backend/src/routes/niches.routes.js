import { Router } from 'express'
import { getNiches } from '../controllers/niches.controller.js'

const router = Router()

router.get('/', getNiches)

export default router