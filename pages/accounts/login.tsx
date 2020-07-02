import { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from './login.module.scss'
import api from '../../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

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
        <title>Log into Decyphr!</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.leftPanel}>
          <h1>Welcome to Decyphr</h1>
          <p>Just login to get back to your learning.</p>
          <p>If you don't have an account yet then you can 
            <Link href="/accounts/register">
              <a>sign up for one here!</a>
            </Link>

            </p>
          <p>Or, if you have forgotten your password, click here!</p>
        </section>

        <section className={styles.rightPanel}>
          <h2>Login To Decyphr</h2>

          {errors.length > 0 &&
            <p>{errors}</p>
          }

          <form>
                <input className={styles.formInput} placeholder="Your Email" name="email" type="text" onChange={e => setEmail(e.target.value)} />
                <input className={styles.formInput} placeholder="Your Password" name="password" type="password" onChange={e => setPassword(e.target.value)} />

            <button className={styles.formButton} onClick={e => submitForm(e)}>
              Login!
            </button>
          </form>
          
        </section>
      </main>
    </>
  )
}