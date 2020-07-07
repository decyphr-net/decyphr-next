import fetch from 'node-fetch'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import styles from './accounts.module.scss'
import api from '../../../utils/api'
import { AccountsLayout } from '../../../components/layout/accounts'
import { Button } from '../../../components/elements/Button'
import { TextInput, SelectInput } from '../../../components/elements/Input'

const LayoutProps = {
  title: 'Register',
  isInverted: false
}

const Register: React.FC = () => {
  const { locale, t } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [nativeLanguage, setNativeLanguage] = useState<string>('')
  const [newLanguage, setNewLanguage] = useState<string>('')
  const [languagePreference, setLanguagePreference] = useState<string>('')
  const [languages, setLanguages] = useState<Array<any>>([])
  const [errors, setErrors] = useState<Array<any>>([])

  const fetcher = url => fetch(url)
    .then(r => r.json())
    .then(data => setLanguages(data))
  
  const { data } = useSWR(process.env.API + 'languages/', fetcher)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push('/[lang]/dashboard', `/${locale}/dashboard`)
    }
  }, [])

  const handleSuccess = data => {
    localStorage.setItem('token', data.auth_token)    
    Router.push('/[lang]/dashboard', `/${locale}/dashboard`)
  }

  const handleError = data => {
    if (typeof data === 'object' && data !== null) {
      let error = data[Object.keys(data)[0]];
      setErrors([...error]);
    } else {
      setErrors([...data])
    }
  }

  const submitForm = e => {
    e.preventDefault()

    let data: any = {
      'username': username,
      'email': email,
      'password': password,
      'first_language': nativeLanguage,
      'language_being_learned': newLanguage,
      'language_preference': languagePreference
    }

    api('POST', 'register', handleSuccess, handleError, false, data)
  }

  const updateLanguagePreference = value => {
    let language = languages[value - 1]
    localStorage.setItem('languagePreference', language.short_code)
    setLanguagePreference(language.id)
  }

  return(
    <AccountsLayout {...LayoutProps}>
      {errors.length > 0 &&
        <p>{errors}</p>
      }

      <form className={styles.form}>
        <TextInput
          placeholder={t('Accounts.register.leftpanel.emailfield')}
          label={t('Accounts.register.leftpanel.emailfield')}
          name="email"
          type="text"
          onChangeHandler={setEmail}
        />
        <TextInput
          placeholder={t('Accounts.register.leftpanel.usernamefield')}
          label={t('Accounts.register.leftpanel.usernamefield')}
          name="username"
          type="text"
          onChangeHandler={setUsername}
        />
        <TextInput
          placeholder={t('Accounts.register.leftpanel.passwordfield')}
          label={t('Accounts.register.leftpanel.passwordfield')}
          name="password"
          type="password"
          onChangeHandler={setPassword}
        />
        <SelectInput
          placeholder={t('Accounts.register.leftpanel.nativelanguage')}
          label={t('Accounts.register.leftpanel.nativelanguage')}
          dataset={languages}
          onChangeHandler={setNativeLanguage}
        />
        <SelectInput
          placeholder={t('Accounts.register.leftpanel.newlanuagagefield')}
          label={t('Accounts.register.leftpanel.newlanuagagefield')}
          dataset={languages}
          onChangeHandler={setNewLanguage}
        />
        <SelectInput
          placeholder={t('Accounts.register.leftpanel.lanuagepreferencefield')}
          label={t('Accounts.register.leftpanel.lanuagepreferencefield')}
          dataset={languages}
          onChangeHandler={updateLanguagePreference}
        />

        <Button
          text={t('Accounts.register.leftpanel.registerbutton')}
          onClickHandler={submitForm}
        />
      </form>
    </AccountsLayout>
  )
}

export default withLocale(Register)