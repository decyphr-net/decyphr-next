import React from 'react'
import Router from 'next/router'
import { Card, Row, Col } from 'react-bootstrap'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/layout/dashboard'
import styles from './library.module.scss'
import { ListInput } from '../../../components/elements/Input'
import { Button } from '../../../components/elements/Button'

const Library: React.FC = () => {
  const { locale, t } = useTranslation()
  const [libraryItems, setLibraryItems] = React.useState([])
  const [searchResults, setSearchResults] = React.useState([])
  const [choice, setChoice] = React.useState(0)
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
    Router.push(
      `/[lang]/reading-session?id=${e.target.value}`,
      `/${locale}/reading-session?id=${e.target.value}`,
      { query: { id: e.target.value } })
  }

  const performBookSearch = async (text) => {
    await api('GET', 'bookSearch', setSearchResults, setErrors, true, undefined, text)
  }

  const addToReadingList = e => {
    e.preventDefault()
    let input = document.querySelector('[name=search]')
    console.log(choice)
  }

  return (
    <DashboardLayout title="Your Library" pageTitle="Library" pageSubtitle="Welcome to your Library. Here you can manage the books in your library or add more!">
      <Row noGutters={true} className="justify-content-md-center">
        <Col md={10}>
          <Row noGutters={true}>
            <Col className={"text-center"} sm={12} md={{ span: 5, offset: 3}}>
              <ListInput
                list="json-datalist"
                placeholder="Search for books by title"
                label="Search for books by title"
                name="search"
                type="text"
                onChangeHandler={performBookSearch}
              />

              <datalist id="json-datalist">
                {searchResults.map((result, index) => {
                  return <option key={index} value={result.id}>{result.title}</option>
                })}
              </datalist>
            </Col>
            <Col className={"text-center text-md-left"} sm={12} md={4}>
              <Button text={"Add"} className={styles.primaryButton} onClickHandler={e => addToReadingList(e)} />
            </Col>  
          </Row>
        </Col>    
      </Row>

      <Row noGutters={true} className={styles.library}>
        {libraryItems.map((item, index) => {
          return (
            <Row noGutters={true}  key={index} className="justify-content-center">
              <Col className={"text-center"} md={8}>
                <Card className={`${styles.bookPanel} flex-row flex-wrap`}>
                  <Row noGutters={true} >
                    <Col sm={12} md={2}>
                      <Card.Header>
                        <img src={item.book.small_thumbnail} alt="" />
                      </Card.Header>
                    </Col>
                    <Col sm={12} md={10}>
                      <Card.Body>
                        <Card.Title>{item.book.title}</Card.Title>
                        <Card.Text>{truncateString(item.book.description)}</Card.Text>
                        <Button 
                          className={"text-sm-center text-md-right"}
                          text={"Start Reading Session"}
                          value={item.book.id}
                          onClickHandler={proceedToSession}
                        />
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