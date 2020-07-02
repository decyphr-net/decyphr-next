import fetch from 'node-fetch'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import styles from './register.module.scss'
import api from '../../utils/api'

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(process.env.API + 'languages/')
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
    localStorage.setItem('token', data.auth_token)    
    Router.push('/dashboard')
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
    <>
      <Head>
        <title>Sign up to Decyphr!</title>
      </Head>

      <main className={styles.main}>

        <section className={styles.leftPanel}>
          <h2>
            Sign up for decyphr
          </h2>

          {errors.length > 0 &&
            <p>{errors}</p>
          }

          <form>
            <input className={styles.formInput} placeholder="Your Email" name="email" type="text" onChange={e => setEmail(e.target.value)} />
            <input className={styles.formInput} placeholder="Your username" name="username" type="text" onChange={e => setUsername(e.target.value)} />
            <input className={styles.formInput} placeholder="Your password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
            
            <select className={styles.formInput} onChange={e => setNativeLanguage(e.target.value)}>
              <option value="" selected disabled hidden>Select your Native Language</option>
              {languages.map((language, index) => {
                return <option key={index} value={language.id}>{language.name}</option>
              })}
            </select>

            <select className={styles.formInput} onChange={e => setNewLanguage(e.target.value)}>
              <option value="" selected disabled hidden>Your Native Language</option>
              {languages.map((language, index) => {
                return <option key={index} value={language.id}>{language.name}</option>
              })}
            </select>

            <select className={styles.formInput} onChange={e => updateLanguagePreference(e.target.value)}>
              <option value="" selected disabled hidden>Site Language Preference</option>
              {languages.map((language, index) => {
                return <option key={index} value={language.id}>{language.name}</option>
              })}
            </select>

            <button className={styles.formButton} onClick={e => submitForm(e)}>
              Register!
            </button>
          </form>
          
        </section>
        <section className={styles.rightPanel}>
          <h1>
            Welcome to Decyphr
          </h1>
          <p>You are just a simple form away from your new learning experience!</p>
          <p>If you already have an account you can 
            <Link href="/accounts/login">
              <a>log in here!</a>
            </Link>
            </p>
        </section>
      </main>
    </>
  )
}