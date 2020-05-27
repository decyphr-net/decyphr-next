import { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

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
      <h1>Dashboard</h1>
    </>
  )
}