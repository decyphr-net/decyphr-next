import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import DashboardLayout from '../../components/layout/dashboard'

export default class Session extends React.Component {

  render() {
    return (
      <>
        <Head>
          <title>Reading Session</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
        </Head>

        <DashboardLayout pageTitle="Your Reading Session" pageSubtitle="Start reading now!">
          
        </DashboardLayout>
      </>
    )
  }
}