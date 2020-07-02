import { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import styles from './login.module.scss'
import api from '../../../utils/api'

const Login: React.FC = () => {
  const { locale, t } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Array<any>>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push('/dashboard')
    }
  })

  const handleSuccess = data => {
    localStorage.setItem('token', data.auth_token)
    Router.push('/')
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
    <>
      <Head>
        <title>{t('Accounts.login.title')}</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.leftPanel}>
          <h1>{t('Accounts.login.leftpanel.header')}</h1>
          <p>{t('Accounts.login.leftpanel.helpparagraph')}</p>
          <p>{t('Accounts.login.leftpanel.signupprompt')}{' '}
            <Link href="/[lang]/accounts/register"  as={`/${locale}/accounts/register`}>
              <a>{t('Accounts.login.leftpanel.signuplink')}</a>
            </Link>

            </p>
          <p>{t('Accounts.login.leftPanel.forgotpasswordprompt')}</p>
        </section>

        <section className={styles.rightPanel}>
          <h2>{t('Accounts.login.rightpanel.header')}</h2>

          {errors.length > 0 &&
            <p>{errors}</p>
          }

          <form>
                <input className={styles.formInput} placeholder={t('Accounts.login.rightpanel.emailfield')} name="email" type="text" onChange={e => setEmail(e.target.value)} />
                <input className={styles.formInput} placeholder={t('Accounts.login.rightpanel.passwordfield')} name="password" type="password" onChange={e => setPassword(e.target.value)} />

            <button className={styles.formButton} onClick={e => submitForm(e)}>
              {t('Accounts.login.rightpanel.loginbutton')}
            </button>
          </form>
          
        </section>
      </main>
    </>
  )
}

export default withLocale(Login)