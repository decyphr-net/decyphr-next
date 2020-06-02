import { useEffect } from 'react'
import Router from 'next/router'
import Navigation from '../../components/layout/Navigation'
import styles from './dashboard.module.scss'

export default function Library({ children, pageTitle, pageSubtitle }) {

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      Router.push('/accounts/login')
    }
  })

  return (
    <main className={styles.layout}>
      <Navigation />
      <section>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        <p className={styles.pageSubtitle}>{pageSubtitle}</p>
      </section>

      <section>
        {children}
      </section>
    </main>
  )
}