import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export async function fetchTrends(country = 'ES') {
  const response = await api.get(`/trends?country=${country}`)
  return response.data
}