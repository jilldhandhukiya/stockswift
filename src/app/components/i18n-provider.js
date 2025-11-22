'use client'
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { locales, defaultLocale, translate } from '@/lib/i18n'

const I18nContext = createContext({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key) => key,
  locales
})

export function I18nProvider({ initialLocale = defaultLocale, children }) {
  const [locale, setLocaleState] = useState(initialLocale)

  useEffect(() => {
    // Load persisted locale
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('locale') || '') : ''
    if (stored && locales.includes(stored) && stored !== locale) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((next) => {
    if (!locales.includes(next)) return
    setLocaleState(next)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', next)
        document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365}`
        document.documentElement.lang = next
      }
    } catch {}
  }, [])

  const t = useCallback((key) => translate(key, locale), [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, locales }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
