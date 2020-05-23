import Head from 'next/head'
import Header from '../components/marketing/Header'
import About from '../components/marketing/About'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Decyphr - Learn languages faster!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
      </Head>

      <main>
        <Header />

        <About />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Hack, monospace
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
