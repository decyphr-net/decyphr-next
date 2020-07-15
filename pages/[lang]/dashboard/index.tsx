import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Card, Row, Col } from 'react-bootstrap'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import APIInterface from '../../../utils/api/client'
import DashboardLayout from '../../../components/layout/dashboard'
import { Button } from '../../../components/elements/Button'

const Dashboard: React.FC = () => {
  const { locale, t } = useTranslation()

  const [translationCount, setTranslationCount] = useState(0)
  const [libraryItemCount, setlibraryItemCount] = useState(0)
  const [readingSessionCount, setReadingSessionCount] = useState(0)
  const [practiceSessionCount, setPracticeSessionCount] = useState(0)

  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      Router.push('/[lang]/accounts/login', `/${locale}/accounts/login`)
    }
  })

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    let apiInterface = new APIInterface('dashboard')
    apiInterface.request()
      .then(response => {
        setTranslationCount(response.translations_count)
        setlibraryItemCount(response.library_item_count)
        setPracticeSessionCount(response.practice_sessions_count)
        setReadingSessionCount(response.reading_sessions_count)

        // We need to set the translation count to determine whether or not a
        // user can access the practice sessions.
        localStorage.setItem('translationCount', response.translations_count)
      })
      .catch(errors => setErrors(errors))
  }

  const redirectToPage = e => {
    let pageName = e.target.value
    Router.push(`/[lang]/${pageName}`, `/${locale}/${pageName}`)
  }

  return (
    <DashboardLayout title="Decyphr Dashboard" pageTitle="Dashboard" pageSubtitle="Welcome to your Decyphr Dashboard">
      <Row noGutters={true} className="justify-content-md-center">
        <Col className="text-center" sm={12} md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Translations</Card.Title>
              <Card.Text>You have translated</Card.Text>
              <Card.Text>{translationCount}</Card.Text>
              <Card.Text>pieces of text</Card.Text>
              <Button 
                className={"text-sm-center text-md-right"}
                text={"Learn new words!"}
                value={"library"}
                onClickHandler={redirectToPage}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center" sm={12} md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Practice Sessions</Card.Title>
              <Card.Text>You have completed</Card.Text>
              <Card.Text>{practiceSessionCount}</Card.Text>
              <Card.Text>sessions to date</Card.Text>
              <Button 
                className={"text-sm-center text-md-right"}
                text={"Reinforce those words!"}
                value={"practice"}
                onClickHandler={redirectToPage}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </DashboardLayout>
  )
}

export default withLocale(Dashboard)