import Head from 'next/head'
import Header from '../components/marketing/Header'
import About from '../components/marketing/About'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Decyphr - Learn languages faster!</title>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
      </Head>

      <main>
        <Header />

        <About />
        <hr />
        <Footer />
      </main>
    </div>
  )
}
