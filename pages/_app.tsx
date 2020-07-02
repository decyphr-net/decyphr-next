import { useState, useEffect }  from 'react'
import { AppProps } from 'next/app'
import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    if (localStorage.getItem('languagePreference')) {
      setLanguage(localStorage.getItem('languagePreference'))
    } else {
      setLanguage(navigator.language.split(/[-_]/)[0])
    }
  })

  return <Component {...pageProps} />
}