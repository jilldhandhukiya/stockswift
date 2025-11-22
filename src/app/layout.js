import './globals.css'
import { cookies } from 'next/headers'
import { I18nProvider } from '@/app/components/i18n-provider'
import { locales, defaultLocale } from '@/lib/i18n'

export const metadata = {
  title: 'Stockswift',
  description: 'Inventory Management System',
}

export default async function RootLayout({ children }) {
  let initialLocale = defaultLocale
  try {
    const cookieStore = await cookies()
    const localeCookie = cookieStore.get('locale')?.value
    if (localeCookie && locales.includes(localeCookie)) {
      initialLocale = localeCookie
    }
  } catch (e) {
    // Fallback silently if cookies API changes or is unavailable
  }
  return (
    <html lang={initialLocale}>
      <body>
        <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
      </body>
    </html>
  )
}