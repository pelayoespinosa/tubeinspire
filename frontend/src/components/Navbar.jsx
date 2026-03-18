export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-red-500">▶</span>
        <span className="text-xl font-semibold">TubeInspire</span>
      </div>
      <span className="text-sm text-gray-500">Encuentra tu próxima idea</span>
    </nav>
  )
}