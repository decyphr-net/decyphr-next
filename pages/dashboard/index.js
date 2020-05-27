import { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Navigation from '../../components/layout/Navigation'
import styles from './dashboard.module.scss'

export default function Dashboard() {

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Router.push('/accounts/login')
    }
  })

  return (
    <>
      <Head>
        <title>Decyphr Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
      </Head>

      <main className={styles.dashboard}>
        <Navigation />
        <section>
          <h1>Dashboard</h1>
          <p>Welcome to your Decyphr Dashboard</p>
        </section>
      </main>
    </>
  )
}