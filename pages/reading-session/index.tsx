import React from 'react'
import Router from 'next/router'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import api from '../../utils/api'
import DashboardLayout from '../../components/layout/dashboard'
import { SessionData } from './types'

const ReadingSession: React.FC = () => {
  const [libraryItem, setLibraryItem] = React.useState(0)
  const [book, setBook] = React.useState({})
  const [showStartModal, setShowStartModal] = React.useState(false)
  const [showEndModal, setShowEndModal] = React.useState(false)
  const [durationModalInput, setDurationModalInput] = React.useState('')
  const [sessionStatus, setSessionStatus] = React.useState('N')
  const [seconds, setSeconds] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const [errors, setErrors] = React.useState({})

  const getInitialProps = ({ query }) => {
    return { query }
  }

  React.useEffect(() => {
    let readingSessions = JSON.parse(localStorage.getItem('library'))
    let session = readingSessions.find(session => {
      return session.book.id == Router.query['id']
    })

    setLibraryItem(session.id)
    setBook(session.book)
  }, [])
  
  React.useEffect(() => {
    if (isRunning) {
      const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000)
      if (seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      }
      return () => clearInterval(timer)
    }
    
  }, [seconds, minutes, isRunning])

  const handleStartModalOpen = () => setShowStartModal(true)
  const handleEndModalOpen = () => setShowEndModal(true)
  const handleStartModalClose = () => setShowStartModal(false)
  const handleEndModalClose = () => setShowEndModal(false)

  const handleSessionCreation = data => {
    let sessionData: SessionData = data;
    setMinutes(+sessionData.duration.split(":")[1] - 1)
    setSeconds(59)
    handleStartModalClose()
    setIsRunning(true)
  }

  const handleErrors = data => {
    console.dir(data)
  }

  const startReadingSession = () => {
    let data: SessionData = {
      library_item: libraryItem,
      pages: 0.0,
      duration: `00:${durationModalInput}:00`,
      status: 'I'
    }

    api('POST', 'readingSession', handleSessionCreation, handleErrors, true, data)
  }

  return (
    <DashboardLayout title="Reading Session" pageTitle="" pageSubtitle="">
      <Row noGutters={true} className="justify-content-md-center">
        <Col xs={10}>
          <Button
            className="btn"
            onClick={handleStartModalOpen}
          >
            Start Reading Now!
          </Button>

          <Button
            className="btn"
            onClick={handleEndModalOpen}
          >
            End Session
          </Button>
        </Col>
      </Row>

      <Row noGutters={true} className="justify-content-md-center">
        <Col xs={10}>
          <div className="App">
            <div>Countdown: {minutes}:{seconds}</div>
          </div>
        </Col>
      </Row>

      <Modal show={showStartModal} onHide={handleStartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a new session?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>How long would you like to read for?</p>
          <input
            type="number"
            placeholder="Number of minutes"
            onChange={e => setDurationModalInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleStartModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={startReadingSession}>
            Start Session
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEndModal} onHide={handleEndModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Finish early?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>How many pages did you read?</p>
          <input
            type="number"
            placeholder="How many pages did you read?"
            onChange={e => setDurationModalInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEndModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={startReadingSession}>
            End Session
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  )
}

export default ReadingSession