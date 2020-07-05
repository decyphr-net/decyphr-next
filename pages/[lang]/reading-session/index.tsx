import React from 'react'
import Router from 'next/router'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/layout/dashboard'
import Book from '../../../types/book'
import { SessionData } from './types'
import styles from './index.module.scss'

const columns = [{
  dataField: 'source_text',
  text: 'Original Text'
}, {
  dataField: 'translated_text',
  text: 'Translated Text'
}, {
  dataField: 'audio_file_path',
  text: 'Audio Clip'
}]

const ReadingSession: React.FC = () => {
  const [libraryItem, setLibraryItem] = React.useState<number>(0)
  const [sessionId, setSessionId] = React.useState<number>(0)
  const [book, setBook] = React.useState<Book>({
    author: "",
    category: "",
    description: "",
    id: 0,
    language: 0,
    publish_date: "",
    publisher: "",
    small_thumbnail: "",
    thumbnail: "",
    title: "",
  })
  const [showStartModal, setShowStartModal] = React.useState<boolean>(false)
  const [showEndModal, setShowEndModal] = React.useState<boolean>(false)
  const [durationModalInput, setDurationModalInput] = React.useState<string>('')
  const [pagesModalInput, setPagesModalInput] = React.useState<number>(0.0)
  const [sessionStatus, setSessionStatus] = React.useState('N')
  const [seconds, setSeconds] = React.useState<number>(0)
  const [minutes, setMinutes] = React.useState<number>(0)
  const [isRunning, setIsRunning] = React.useState<boolean>(false)
  const [startButtonClass, setStartButtonClass] = React.useState<string>('')
  const [endButtonClass, setEndButtonState] = React.useState<string>('d-none')
  const [timerClassName, setTimerClassName] = React.useState<string>('d-none')
  const [textToTranslate, setTextToTranslate] = React.useState<string>('')
  const [translations, setTranslations] = React.useState<Array<any>>([])
  const [errors, setErrors] = React.useState({})

  /**
   * Get the book ID from the query parameters
   * @param query - The ID of the book that is being read 
   */
  const getInitialProps = ({ query }) => {
    return { query }
  }

  /**
   * Get the intial book and session related information from the query string
   * and local storage in order to udpate the related state
   */
  React.useEffect(() => {
    let readingSessions = JSON.parse(localStorage.getItem('library'))
    let session = readingSessions.find(session => {
      return session.book.id == Router.query['id']
    })

    setLibraryItem(session.id)
    setBook(session.book)
  }, [])
  
  /**
   * Update the timer information. This will update the seconds and minutes
   * counters to inform the user of the amount of time they have remaining in
   * the current reading session.
   * 
   * The `isRunning` value will inform the function as to whether or not the
   * user should be seeing the timer counting down
   */
  React.useEffect(() => {
    if (isRunning) {
      const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000)
      if (seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      }

      if (seconds === 0 && minutes === 0) {
        setIsRunning(false)
        setTimerClassName('d-none')
        setEndButtonState('d-none')
        setSessionStatus('F')
        handleEndModalOpen()
      }
      return () => clearInterval(timer)
    }
    
  }, [seconds, minutes, isRunning])

  /**
   * Functions related to the showing and hiding of the modals
   */
  const handleStartModalOpen = () => setShowStartModal(true)
  const handleEndModalOpen = () => setShowEndModal(true)
  const handleStartModalClose = () => setShowStartModal(false)
  const handleEndModalClose = () => setShowEndModal(false)

  const handleSessionCreation = data => {
    let sessionData: SessionData = data
    setMinutes(+sessionData.duration.split(":")[1] - 1)
    setSeconds(59)
    setSessionId(sessionData.id)
    handleStartModalClose()
    setIsRunning(true)
    setEndButtonState('')
    setStartButtonClass('d-none')
    setTimerClassName('')
  }

  const handleSessionEnd = data => {
    setIsRunning(false)
    setTimerClassName('d-none')
    setMinutes(0)
    setSeconds(0)
    setEndButtonState('d-none')
    handleEndModalClose()
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

  const endReadingSession = () => {
    let data: any = {}

    if (sessionStatus === 'F') {
      data = {
        pages: pagesModalInput,
        status: 'F'
      }
    } else {
      data = {
        pages: pagesModalInput,
        status: 'E'
      }
    }
    
    api('PATCH', 'readingSession', handleSessionEnd, handleErrors, true, data, null, String(sessionId))
  }

  const submitText = () => {
    console.log(sessionId)
    let data: any = {
      text_to_be_translated: textToTranslate,
      session: sessionId
    }

    api('POST', 'translate', handleTranslation, handleErrors, true, data, null, null)
  }

  const handleTranslation = data => {
    console.log(data)
    setTranslations(translations.concat(data))
  }

  return (
    <DashboardLayout title="Reading Session" pageTitle={book.title} pageSubtitle="">
      <Row noGutters={true} className="justify-content-md-center">
        <Col xs={1}>
          <img src={book.small_thumbnail} alt={book.title} />
        </Col>
        <Col xs={9}>
          <div className={timerClassName}>
            <div>Time Remaining: {minutes}:{seconds}</div>
          </div>
          <Button
            className={startButtonClass}
            onClick={handleStartModalOpen}
          >
            Start Reading Now!
          </Button>

          <Button
            className={endButtonClass}
            onClick={handleEndModalOpen}
          >
            End Session
          </Button>
        </Col>
      </Row>

      <Row noGutters={true} className="justify-content-md-center">
        <Col md={{ offset: 4, span: 4}}>
          <input
            className={styles.translateText}
            type="text"
            placeholder="Translate text"
            onChange={e => setTextToTranslate(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button
            className={styles.translateButton}
            onClick={submitText}
          >
            Translate
          </Button>
        </Col>
      </Row>

      <Row noGutters={true} className="justify-content-md-center">
        <Col md={10}>
          <BootstrapTable keyField='id' data={ translations } columns={ columns } />
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
            onChange={e => setPagesModalInput(+e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEndModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={endReadingSession}>
            End Session
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  )
}

export default ReadingSession