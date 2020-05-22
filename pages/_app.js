import {useState, useEffect}  from 'react'
import {IntlProvider} from 'react-intl'
import '../styles/global.scss'

import locale_en from '../langs/en.json'
import locale_pt from '../langs/pt.json'

const data = {
  "en": locale_en,
  "pt": locale_pt
};

export default function App({ Component, pageProps }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    setLanguage(navigator.language.split(/[-_]/)[0])
  })

  return (
    <IntlProvider locale={language} messages={data[language]}>
      <Component {...pageProps} />
    </IntlProvider>
  )
}