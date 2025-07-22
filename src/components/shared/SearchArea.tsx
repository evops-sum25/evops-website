import { useTranslation } from 'react-i18next'

interface SearchAreaProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
}

export default function SearchArea({
  value,
  onChange,
  onClear,
}: SearchAreaProps) {
  const { t } = useTranslation('searchArea')
  return (
    <label className="input">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        className="grow"
        placeholder={t('placeholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={onClear} className="btn btn-xs">
          ✕
        </button>
      )}
    </label>
  )
}
