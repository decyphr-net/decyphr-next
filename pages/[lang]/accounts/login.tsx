import { useState, useEffect } from 'react'
import Router from 'next/router'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import styles from './accounts.module.scss'
import api from '../../../utils/api'
import { AccountsLayout } from '../../../components/layout/accounts'
import { Button } from '../../../components/elements/Button'
import { TextInput } from '../../../components/elements/Input'

const LayoutProps = {
  title: 'Login',
  isInverted: true
}

const Login: React.FC = () => {
  const { locale, t } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Array<any>>([])

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
      'username': email,
      'password': password
    }

    api('POST', 'login', handleSuccess, handleError, false, data)
  }

  return (
    <AccountsLayout {...LayoutProps}>
      {errors.length > 0 &&
        <p>{errors}</p>
      }
      
      <form className={styles.form}>
        <TextInput
          value={email}
          placeholder={t('Accounts.login.rightpanel.emailfield')}
          label={t('Accounts.login.rightpanel.emailfield')}
          name="email"
          type="text"
          onChangeHandler={setEmail}
        />
        <TextInput
          value={password}
          placeholder={t('Accounts.login.rightpanel.passwordfield')}
          label={t('Accounts.login.rightpanel.passwordfield')}
          name="password"
          type="password"
          onChangeHandler={setPassword}
        />
        <Button
          text={t('Accounts.login.rightpanel.loginbutton')}
          onClickHandler={submitForm}
        />
      </form>
    </AccountsLayout>
  )
}

export default withLocale(Login)