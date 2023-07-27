import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { KioskoProvider } from '@/context/KioskoProvider'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <KioskoProvider>
      <Component {...pageProps} />
    </KioskoProvider>
  )
}
