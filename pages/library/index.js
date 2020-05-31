import React from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/dashboard'
import styles from './library.module.scss'

export default class Library extends React.Component {
  state = {
    libraryItems: []
  }

  componentDidMount = async () => {
    this.setState({"libraryItems": JSON.parse(localStorage.getItem('library'))})
  }

  truncateString = string => {
    if (string.length <= 150) {
      return string
    }

    return string.slice(0, 150) + '...'
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
          <ul className={styles.bookPanel}>
            {this.state.libraryItems.map((item, index) => {
              console.log(item)
              return (
                <li key={index}>
                  <img src={item.book.small_thumbnail} />
                  <h2>{item.book.title}</h2>
                  <p>{this.truncateString(item.book.description)}</p>
                  <p>Number of reading sessions - {item.readingsession_count}</p>

                  <button>Start Reading Session</button>
                </li>
              )
            })}
          </ul>
        </DashboardLayout>
      </>
    )
  }
}