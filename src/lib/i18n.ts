import en from '@/lib/locales/en/locale'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'translation'
export const resources = {
  en,
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
