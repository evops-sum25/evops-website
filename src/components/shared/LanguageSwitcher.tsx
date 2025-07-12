import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        {i18n.language === 'ru' ? '🇷🇺 RU' : '🇺🇸 EN'}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box bg-base-100 z-[1] w-52 p-2 shadow"
      >
        <li>
          <button
            onClick={() => changeLanguage('ru')}
            className={`${i18n.language === 'ru' ? 'active' : ''}`}
          >
            🇷🇺 Русский
          </button>
        </li>
        <li>
          <button
            onClick={() => changeLanguage('en')}
            className={`${i18n.language === 'en' ? 'active' : ''}`}
          >
            🇺🇸 English
          </button>
        </li>
      </ul>
    </div>
  )
}
