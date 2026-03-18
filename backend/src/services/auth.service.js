import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import supabase from './supabase.service.js'

export async function register(name, email, password) {
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (existing) throw new Error('El email ya está registrado')

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password: hashedPassword }])
    .select()
    .single()

  if (error) throw new Error(error.message)

  const token = jwt.sign(
    { id: data.id, email: data.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { token, user: { id: data.id, name: data.name, email: data.email } }
}

export async function login(email, password) {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (!user) throw new Error('Email o contraseña incorrectos')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Email o contraseña incorrectos')

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { token, user: { id: user.id, name: user.name, email: user.email } }
}