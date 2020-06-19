import Head from 'next/head'
import Header from '../components/marketing/Header'
import About from '../components/marketing/About'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <div className="container-fluid">
      <Head>
        <title>Decyphr - Learn languages faster!</title>
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
