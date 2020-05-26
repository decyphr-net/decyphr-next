import { useState, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import styles from './login.module.scss'
import api from '../../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push('/')
    }
  })

  const handleSuccess = data => {
    localStorage.setItem("token", data.token)
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

    let data = {
      'username': email,
      'password': password
    }

    api({
      method: 'POST',
      endpointName: 'login',
      data: data,
      setState: handleSuccess,
      setErrors: handleError
    })
  }

  return (
    <main className={styles.main}>
      <section className={styles.leftPanel}>
        <h1>
          <FormattedMessage
            id="Accounts.login.leftpanel.header"
            defaultMessage="Welcome to Decyphr" />
        </h1>
        <p>
          <FormattedMessage
            id="Accounts.login.leftpanel.helpparagraph"
            defaultMessage="Just login to get back to your learning." />
          </p>
        <p>
          <FormattedMessage
            id="Accounts.login.leftpanel.signupprompt"
            defaultMessage="If you don't have an account yet then you can sign up for one here!" />
          </p>
        <p>
          <FormattedMessage
            id="Accounts.login.leftPanel.forgotpasswordprompt"
            defaultMessage="Or, if you have forgotten your password, click here!" />
        </p>
      </section>

      <section className={styles.rightPanel}>
        <h2>
          <FormattedMessage
            id="Accounts.login.rightpanel.header"
            defaultMessage="Login To Decyphr" />
          </h2>

        {errors.length > 0 &&
          <p>{errors}</p>
        }

        <form>
          <FormattedMessage id="Accounts.login.rightpanel.emailfield" defaultMessage="Email">
            {
              placeholder => (
                <input className={styles.formInput} placeholder={placeholder} name="email" type="text" onChange={e => setEmail(e.target.value)} />
              )
            }
          </FormattedMessage>

          <FormattedMessage id="Accounts.login.rightpanel.passwordfield" defaultMessage="Password">
            {
              placeholder => (
                <input className={styles.formInput} placeholder={placeholder} name="password" type="password" onChange={e => setPassword(e.target.value)} />
              )
            }
          </FormattedMessage>

          <button className={styles.formButton} onClick={e => submitForm(e)}>
            <FormattedMessage
              id="Accounts.login.rightpanel.loginbutton"
              defaultMessage="Login!" />
          </button>
        </form>
        
      </section>
    </main>
  )
}