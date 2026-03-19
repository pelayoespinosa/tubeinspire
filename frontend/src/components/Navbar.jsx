import { useNavigate, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="TubeInspire" className="w-8 h-8 object-contain" />
          <span className="text-white text-lg font-semibold">TubeInspire</span>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-1">BETA</span>
        </div>
        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`
            }
          >
            Tendencias
          </NavLink>
          <NavLink
            to="/niches"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`
            }
          >
            Nichos
          </NavLink>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm bg-gray-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-gray-700"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}