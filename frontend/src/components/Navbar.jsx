import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-red-500">▶</span>
        <span className="text-xl font-semibold">TubeInspire</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Hola, {user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}