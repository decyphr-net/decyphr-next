import Head from 'next/head'
import { Row, Col } from 'react-bootstrap'
import withLocale from '../../i18n/hoc/withLocale'
import useTranslation from '../../i18n/hooks/useTranslation'
import LinkButton from '../../components/elements/Button'
import Footer from '../../components/layout/Footer'
import styles from './index.module.scss'

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container-fluid">
      <Head>
        <title>{t('Index.title')}</title>
      </Head>

      <main>
        <header className={styles.header}>
          <h1 className={styles.firstHeading}>
            {t('Index.header.heading')}
          </h1>

          <p className={styles.paragraph}>
            {t('Index.header.paragraph')}
          </p>

          <p className={styles.callToAction}>
            <LinkButton location="/accounts/login">
              {t('Index.header.calltoaction')}
            </LinkButton>
          </p>
        </header>
        <article id="about" className={styles.about}>
          <section>
            <Row>
              <Col sm={12} md={4}>
                <img className={`${styles.img}`} src="/languages.jpg" />
              </Col>

              <Col sm={12} md={8}>
                <h2>{t('Index.about.whatisitheader')}</h2>

                <p>
                  {t('Index.about.whatisitparagraph1')}
                </p>
                
                <p>
                  {t('Index.about.whatisitparagraph2')}
                </p>

                <p>
                  {t('Index.about.whatisitparagraph3')}
                </p>
              </Col>
            </Row>        
          </section>
          <section>
            <Row>
              <Col sm={12} md={4}>
                <img className={`${styles.img} mr-3`} src="/bookstack.jpg" />
              </Col>

              <Col sm={12} md={8}>
                <h2>
                  {t('Index.about.whydecyphrheader')}
                </h2>
                <p>
                  {t('Index.about.whydecyphrparagraph1')}
                </p>
                <p>
                  {t('Index.about.whydecyphrparagraph2')}
                </p>
                <p>
                  {t('Index.about.whydecyphrparagraph3')}
                </p>
              </Col>
            </Row>
          </section>
        </article>
        <hr />
        <Footer />
      </main>
    </div>
  )
}

export default withLocale(Home)