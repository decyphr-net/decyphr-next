import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Card, Row, Col } from 'react-bootstrap'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/layout/dashboard'
import styles from './library.module.scss'

const Library: React.FC = () => {
  const { locale, t } = useTranslation()
  const [libraryItems, setLibraryItems] = React.useState([])
  const [searchResults, setSearchResults] = React.useState([])
  const [errors, setErrors] = React.useState([])

  React.useEffect(() => {
    setLibraryItems(JSON.parse(localStorage.getItem('library')))
  }, [])

  const truncateString = text => {
    if (text.length <= 150) {
      return text
    }
    return text.slice(0, 150) + '...'
  }

  const proceedToSession = e => {
    e.preventDefault()
    console.log(e.target.value)
    Router.push(
      `/[lang]/reading-session?id=${e.target.value}`,
      `/${locale}/reading-session?id=${e.target.value}`,
      { query: { id: e.target.value } })
  }

  const performBookSearch = async (text) => {
    await api('GET', 'bookSearch', setSearchResults, setErrors, true, undefined, text)
  }

  return (
    <DashboardLayout title="Your Library" pageTitle="Library" pageSubtitle="Welcome to your Library. Here you can manage the books in your library or add more!">
      <Row noGutters={true} className="justify-content-md-center">
        <Col md={10}>
          <Row className="no-gutters">
            <Col sm={12} md={{ span: 5, offset: 3}}>
              <input
                className={styles.bookSearch}
                list="json-datalist"
                type="text"
                placeholder="Search for books by title"
                onChange={e => performBookSearch(e.target.value)}
              />

              <datalist id="json-datalist">
                {searchResults.map((result, index) => {
                  return <option key={index} value={result.title} />
                })}
              </datalist>
            </Col>
            <Col sm={12} md={4}>
              <button className={styles.primaryButton}>Add</button>
            </Col>  
          </Row>
        </Col>    
      </Row>

      <Row noGutters={true} className={styles.library}>
        {libraryItems.map((item, index) => {
          return (
            <Row key={index} className="justify-content-md-center no-gutters">
              <Col md={8}>
                <Card className={`${styles.bookPanel} flex-row flex-wrap`}>
                  <Row>
                    <Col sm={12} md={2}>
                      <Card.Header>
                        <img src={item.book.small_thumbnail} alt="" />
                      </Card.Header>
                    </Col>
                    <Col sm={12} md={10}>
                      <Card.Body>
                        <Card.Title>{item.book.title}</Card.Title>
                        <Card.Text>{truncateString(item.book.description)}</Card.Text>
                        <button onClick={e => proceedToSession(e)} value={item.book.id} className={styles.startSession}>
                          Start Reading Session
                        </button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )
        })}
      </Row>
    </DashboardLayout>
  )
}

export default withLocale(Library)
