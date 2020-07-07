import React, { ReactNode } from 'react'
import Head from 'next/head'
import styles from './accounts.module.scss'

interface LayoutProps {
  title: string
  isInverted: boolean
  aboutSection?: ReactNode
  children?: ReactNode
}

interface Panel {
  text?: ReactNode
  children?: ReactNode
}

const WithLeftPanel: React.FC = (props: Panel) => {
  return (
    <>
      <div className={styles.backgroundInverted}></div>
      <div className={styles.content}>
        <form>
          { props.children }
        </form>
      </div>
    </>
  )
}

const WithRightPanel: React.FC = (props: Panel) => {
  return (
    <>
      <div className={styles.content}>
        <form>
          { props.children }
        </form>
      </div>
      <div className={styles.background}>
        { props.text }
      </div>
    </>
  )
}

export const AccountsLayout: React.FC = (props: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{ props.title }</title>
      </Head>

      <main className={styles.container}>
        { props.aboutSection }

        { props.isInverted
          ? <WithLeftPanel>{ props.children }</WithLeftPanel>
          : <WithRightPanel>{ props.children }</WithRightPanel>
        }
      </main>
    </>
  )
}