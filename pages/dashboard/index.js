import { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Navigation from '../../components/layout/Navigation'
import styles from './dashboard.module.scss'
import api from '../../utils/api'

export default function Dashboard() {
  const [translations, setTranslations] = useState([]);
  const [libraryItems, setLibraryItems] = useState([]);
  const [readingSessions, setReadingSessions] = useState([]);
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Router.push('/accounts/login')
    }

    getDashboardData()
  }, [])

  const setStateItems = async (response) => {
    await setTranslations(response.translations)
    await setLibraryItems(response.library_items)
    await setReadingSessions(response.reading_sessions)
    await setPracticeSessions(response.practice_sessions)

    localStorage.setItem('library', JSON.stringify(response.library_items))
    localStorage.setItem('translations', JSON.stringify(response.library_items))
    localStorage.setItem('readingsessions', JSON.stringify(response.reading_sessions))
    localStorage.setItem('practicesessions', JSON.stringify(response.practice_sessions))
  }

  const getDashboardData = async () => {
    if (localStorage.getItem('library')
        && localStorage.getItem('translations') 
        && localStorage.getItem('readingsessions') 
        && localStorage.getItem('practicesessions')) 
    {
      await setTranslations(getJson('library'))
      await setLibraryItems(getJson('translations'))
      await setReadingSessions(getJson('readingsessions'))
      await setPracticeSessions(getJson('practicesessions'))
    } else {
      await api({
        method: 'GET',
        endpointName: 'dashboard',
        setState: setStateItems,
        setErrors: setErrors,
        authRequired: true
      });
    }
  }

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