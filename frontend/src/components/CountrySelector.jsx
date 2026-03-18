const COUNTRIES = [
  { code: 'ES', label: 'España', flag: '🇪🇸' },
  { code: 'US', label: 'EE.UU.', flag: '🇺🇸' },
  { code: 'MX', label: 'México', flag: '🇲🇽' },
  { code: 'AR', label: 'Argentina', flag: '🇦🇷' },
  { code: 'JP', label: 'Japón', flag: '🇯🇵' },
  { code: 'GB', label: 'Reino Unido', flag: '🇬🇧' },
  { code: 'BR', label: 'Brasil', flag: '🇧🇷' },
  { code: 'DE', label: 'Alemania', flag: '🇩🇪' },
]

export default function CountrySelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {COUNTRIES.map(c => (
        <button
          key={c.code}
          onClick={() => onChange(c.code)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5
            ${value === c.code
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
              : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
            }`}
        >
          <span>{c.flag}</span>
          <span>{c.label}</span>
        </button>
      ))}
    </div>
  )
}