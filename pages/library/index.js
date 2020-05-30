import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Navigation from '../../components/layout/Navigation'
import styles from './library.module.scss'

export default class Library extends React.Component {
  state = {
    libraryItems: []
  }

  componentDidMount = async () => {
    if (!window.localStorage.getItem('token')) {
      Router.push('/accounts/login')
    }

    this.setState({"libraryItems": JSON.parse(localStorage.getItem('library'))})
  }

  render () {
    return (
      <>
        <Head>
          <title>Your Library</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
        </Head>
  
        <main className={styles.library}>
          <Navigation />
          <section>
            <h1>Library</h1>
            <p>Welcome to your Library. Here you can manage the books in your library or add more!</p>
          </section>
  
          <section>
            {this.state.libraryItems.map((item, index) => {
              return (
                <>
                <img src={item.book.small_thumbnail} />
                <p key={index}>{item.book.title}</p>
                </>
              )
            })}
          </section>
        </main>
      </>
    )
  }
}