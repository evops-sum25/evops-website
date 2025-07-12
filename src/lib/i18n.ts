import en from '@/lib/locales/en/locale'
import ru from '@/lib/locales/ru/locale'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'translation'
export const resources = {
  en,
  ru,
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru', // Устанавливаем русский как язык по умолчанию
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
