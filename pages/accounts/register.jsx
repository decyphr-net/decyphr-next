import fetch from 'node-fetch'
import { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from './register.module.scss'
import api from '../../utils/api'

export async function getStaticProps() {
  const response = await fetch(process.env.api + 'languages/')
  let data = await response.json()
  
  return {
    props: {
      languages: data
    }
  }
}

export default function Register({ languages }) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [languagePreference, setLanguagePreference] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push('/')
    }
  }, [])

  const handleSuccess = data => {
    localStorage.setItem('token', data.token)    
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

  const login = () => {
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

  const submitForm = e => {
    e.preventDefault()

    let data = {
      'username': username,
      'email': email,
      'password': password,
      'first_language': nativeLanguage,
      'language_being_learned': newLanguage,
      'language_preference': languagePreference
    }

    api({
      method: 'POST',
      endpointName: 'register',
      data: data,
      setState: login,
      setErrors: handleError
    })
  }

  const updateLanguagePreference = value => {
    let language = languages[value - 1]
    localStorage.setItem('languagePreference', language.short_code)
    setLanguagePreference(language.id)
  }

  return(
    <>
      <Head>
        <title>Sign up to Decyphr!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
      </Head>

      <main className={styles.main}>

        <section className={styles.leftPanel}>
          <h2>
            <FormattedMessage
              id="Accounts.register.leftpanel.header"
              defaultMessage="Sign up for Decyphr" />
          </h2>

          {errors.length > 0 &&
            <p>{errors}</p>
          }

          <form>
            <FormattedMessage id="Accounts.register.leftpanel.emailfield" defaultMessage="Email">
              {
                placeholder => (
                  <input className={styles.formInput} placeholder={placeholder} name="email" type="text" onChange={e => setEmail(e.target.value)} />
                )
              }
            </FormattedMessage>

            <FormattedMessage id="Accounts.register.leftpanel.usernamefield" defaultMessage="Username">
              {
                placeholder => (
                  <input className={styles.formInput} placeholder={placeholder} name="username" type="text" onChange={e => setUsername(e.target.value)} />
                )
              }
            </FormattedMessage>

            <FormattedMessage id="Accounts.register.leftpanel.passwordfield" defaultMessage="Password">
              {
                placeholder => (
                  <input className={styles.formInput} placeholder={placeholder} name="password" type="password" onChange={e => setPassword(e.target.value)} />
                )
              }
            </FormattedMessage>

            <FormattedMessage id="Accounts.register.leftpanel.nativelanguage" defaultMessage="Native Language">
              {
                placeholder => (
                  <select className={styles.formInput} onChange={e => setNativeLanguage(e.target.value)}>
                    <option value="" selected disabled hidden>{placeholder}</option>
                    {languages.map((language, index) => {
                      return <option key={index} value={language.id}>{language.name}</option>
                    })}
                  </select>
                )
              }
            </FormattedMessage>

            <FormattedMessage id="Accounts.register.leftpanel.newlanuagagefield" defaultMessage="New Language">
              {
                placeholder => (
                  <select className={styles.formInput} onChange={e => setNewLanguage(e.target.value)}>
                    <option value="" selected disabled hidden>{placeholder}</option>
                    {languages.map((language, index) => {
                      return <option key={index} value={language.id}>{language.name}</option>
                    })}
                  </select>
                )
              }
            </FormattedMessage>

            <FormattedMessage id="Accounts.register.leftpanel.lanuagepreferencefield" defaultMessage="Your Language Preference">
              {
                placeholder => (
                  <select className={styles.formInput} onChange={e => updateLanguagePreference(e.target.value)}>
                    <option value="" selected disabled hidden>{placeholder}</option>
                    {languages.map((language, index) => {
                      return <option key={index} value={language.id}>{language.name}</option>
                    })}
                  </select>
                )
              }
            </FormattedMessage>

            <button className={styles.formButton} onClick={e => submitForm(e)}>
              <FormattedMessage
                id="Accounts.register.leftpanel.registerbutton"
                defaultMessage="Register!" />
            </button>
          </form>
          
        </section>
        <section className={styles.rightPanel}>
        <h1>
            <FormattedMessage
              id="Accounts.register.rightpanel.header"
              defaultMessage="Welcome to Decyphr" />
          </h1>
          <p>
            <FormattedMessage
              id="Accounts.register.rightpanel.helpparagraph"
              defaultMessage="You are just a simple form away from your new learning experience!" />
            </p>
          <p>
            <FormattedMessage
              id="Accounts.register.rightpanel.loginprompt"
              defaultMessage="If you already have an account you can "/>
            <Link href="/accounts/login">
              <a><FormattedMessage id="Accounts.register.rightpanel.loginlink" defaultMessage="log in here!"/></a>
            </Link>
            
            </p>
        </section>
      </main>
    </>
  )
}