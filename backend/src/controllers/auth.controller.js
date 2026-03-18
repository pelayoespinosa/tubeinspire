import { register, login } from '../services/auth.service.js'

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' })

    const result = await register(name, email, password)
    res.status(201).json({ success: true, ...result })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' })

    const result = await login(email, password)
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}