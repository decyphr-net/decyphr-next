import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import api from '../../utils/api'
import DashboardLayout from '../../components/layout/dashboard'
import styles from './library.module.scss'

export default class Library extends React.Component {
  state = {
    libraryItems: [],
    searchResults: [],
    errors: []
  }

  componentDidMount = async () => {
    this.setState({'libraryItems': JSON.parse(localStorage.getItem('library'))})
  }

  truncateString = string => {
    if (string.length <= 150) {
      return string
    }
    return string.slice(0, 150) + '...'
  }

  proceedToSession = e => {
    e.preventDefault()

    Router.push({
      pathname: '/reading-session',
      query: { id: e.target.value },
    })
  }

  setSearchResults = data => {
    this.setState({'searchResults': data})
  }

  setErrors = data => {
    this.setState({'errors': data})
  }

  performBookSearch = text => {
    api({
      method: 'GET',
      endpointName: 'bookSearch',
      params: text,
      setState: this.setSearchResults,
      setErrors: this.setErrors,
      authRequired: true
    })
  }

  render () {
    return (
      <>
        <Head>
          <title>Your Library</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
        </Head>

        <DashboardLayout pageTitle="Library" pageSubtitle="Welcome to your Library. Here you can manage the books in your library or add more!">
          <input
            className={styles.bookSearch}
            list="json-datalist"
            type="text"
            placeholder="Search for books by title"
            onChange={e => this.performBookSearch(e.target.value)}
          />
          <button className={styles.primaryButton}>Add to library</button>
          <datalist id="json-datalist">
            {this.state.searchResults.map((result, index) => {
              return <option key={index} value={result.title} />
            })}
          </datalist>
          <ul className={styles.bookPanel}>
            {this.state.libraryItems.map((item, index) => {
              return (
                <li key={index}>
                  <img src={item.book.small_thumbnail} />
                  <h2>{item.book.title}</h2>
                  <p>{this.truncateString(item.book.description)}</p>
                  <p className={styles.subtext}>Number of reading sessions - {item.readingsession_count}</p>
                  <button>Options</button>
                  <button onClick={e => this.proceedToSession(e)} value={item.book.id} className={styles.startSession}>Start Reading Session</button>
                </li>
              )
            })}
          </ul>
        </DashboardLayout>
      </>
    )
  }
}