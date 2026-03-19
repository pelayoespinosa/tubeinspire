import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function fetchTrends(country = 'ES') {
  const response = await api.get(`/trends?country=${country}`)
  return response.data
}

export async function loginUser(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export async function registerUser(name, email, password) {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data
}

export async function fetchNiches(category, country = 'ES') {
  const response = await api.get(`/niches?category=${category}&country=${country}`)
  return response.data
}