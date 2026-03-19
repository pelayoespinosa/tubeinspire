import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Niches from './pages/Niches'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout><Home /></Layout>
          </PrivateRoute>
        } />
        <Route path="/niches" element={
          <PrivateRoute>
            <Layout><Niches /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}