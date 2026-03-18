const COUNTRIES = [
  { code: 'ES', label: 'España' },
  { code: 'US', label: 'Estados Unidos' },
  { code: 'MX', label: 'México' },
  { code: 'AR', label: 'Argentina' },
  { code: 'JP', label: 'Japón' },
  { code: 'GB', label: 'Reino Unido' },
  { code: 'BR', label: 'Brasil' },
  { code: 'DE', label: 'Alemania' },
]

export default function CountrySelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {COUNTRIES.map(c => (
        <button
          key={c.code}
          onClick={() => onChange(c.code)}
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors
            ${value === c.code
              ? 'bg-red-500 text-white border-red-500'
              : 'border-gray-300 text-gray-600 hover:border-red-400'
            }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}