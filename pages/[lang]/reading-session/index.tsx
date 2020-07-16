import React from 'react'
import Router from 'next/router'
import { Row, Col, Modal } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ReactAudioPlayer from 'react-audio-player'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/layout/dashboard'
import Book from '../../../types/book'
import { SessionData } from './types'
import { TextInput } from '../../../components/elements/Input'
import { Button } from '../../../components/elements/Button'
import styles from './index.module.scss'

function audioFormatter(cell, row) {
  return (
    <ReactAudioPlayer preload="none" controls>
      <source src={ cell } />
    </ReactAudioPlayer>
  )
}

const ReadingSession: React.FC = () => {
  const { locale, t } = useTranslation()
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

  const options = {  
    page: 2,
    sizePerPageList: [ {
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: translations.length 
    }],
    sizePerPage: 5,
    pageStartIndex: 0,
    paginationSize: 3,
    prePage: 'Prev',
    nextPage: 'Next',
    firstPage: 'First',
    lastPage: 'Last',
    paginationPosition: 'top'
  }

  const columns = [{
    dataField: 'source_text',
    text: t('Readingsession.translate.table.headerone')
  }, {
    dataField: 'translated_text',
    text: t('Readingsession.translate.table.headertwo')
  }, {
    dataField: 'audio_file_path',
    text: t('Readingsession.translate.table.headerthree'),
    formatter: audioFormatter
  }]

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
    getBookLibraryItem()
  }, [])

  const getLibraryItemHandler = data => {
    setBook(data.book)
  }

  const getBookLibraryItem = async () => {
    setLibraryItem(+Router.query['id'])
    await api(
      'GET', 
      'readingList', 
      getLibraryItemHandler, 
      setErrors, 
      true, 
      undefined, 
      null, 
      Router.query['id'].toString()
    )
  }
  
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
      setSessionStatus('F')
    } else {
      data = {
        pages: pagesModalInput,
        status: 'E'
      }
      setSessionStatus('E')
    }
    
    api('PATCH', 'readingSession', handleSessionEnd, handleErrors, true, data, null, String(sessionId))
  }

  const submitText = () => {
    let data: any = {
      text_to_be_translated: textToTranslate,
      session: sessionId
    }

    api('POST', 'translate', handleTranslation, handleErrors, true, data, null, null)
  }

  const handleTranslation = data => {
    setTranslations([data, ...translations])
  }

  const returnToLibrary = e => {
    e.preventDefault()
    Router.push('/[lang]/library', `/${locale}/library`)
  }

  return (
    <DashboardLayout
      title={t('Readingsession.page.title')}
      pageTitle={book.title}
      pageSubtitle=""
    >
      <Row noGutters={true} className="justify-content-md-center">
        <Col className="text-center" xs={12} lg={2}>
          <img src={book.small_thumbnail} alt={book.title} />
        </Col>
        <Col className="text-center text-lg-center" xs={12} md={8} lg={9}>
          <Button
            className={endButtonClass}
            text={t('Readingsession.header.timer.endtimer')}
            onClickHandler={handleEndModalOpen}
          />
          <Button
            className={startButtonClass}
            text={t('Readingsession.header.timer.starttimer')}
            onClickHandler={handleStartModalOpen}
          />
          
          <div className={`${timerClassName} ${styles.timer}`}>
            {t('Readingsession.header.timer.timeremaining')}{' '}{minutes}:{seconds}
          </div>
          
        </Col>
      </Row>

      {!isRunning
        ? (sessionStatus === 'F' || sessionStatus === 'E'
          ? (
            <Row noGutters={true} className="justify-content-md-center">
              <Col className="text-center" xs={6}>
                <p>{t('Readingsession.session.end.paragraphone')}</p>
                <p>{t('Readingsession.session.end.paragraphtwo')}{' '}00:{durationModalInput}:00</p>
                <p>{t('Readingsession.session.end.paragraphthree')}{' '}{pagesModalInput} pages</p>
                <p>{t('Readingsession.session.end.paragraphfour')}{' '}{translations.length}</p>
                <Button
                  text={"Return to Library"}
                  onClickHandler={returnToLibrary}
                />
                <Button
                  text={"Start another session"}
                  onClickHandler={handleStartModalOpen}
                />
              </Col>
            </Row>
          ) : (
            <Row noGutters={true} className="justify-content-md-center">
              <Col className="text-center" xs={6}>
                <h2>{t('Readingsession.session.pretext.heading')}</h2>
                <p>{t('Readingsession.session.pretext.paragraphone')}</p>
                <p>{t('Readingsession.session.pretext.paragraphtwo')}</p>
              </Col>
            </Row>
          )
        ) : (
          <div className={`${isRunning ? '' : 'd-none'}`}>
            <Row noGutters={true} className="justify-content-md-center">
              <Col xs={12} md={10} lg={{ offset: 4, span: 4}}>
                <TextInput
                  value={textToTranslate}
                  placeholder={t('Readingsession.translate.input.placeholder')}
                  label={t('Readingsession.translate.input.placeholder')}
                  name="text-to-translate"
                  type="text"
                  onChangeHandler={setTextToTranslate}
                />
              </Col>
              <Col className="text-center text-lg-left" xs={12} md={8} lg={4}>
                <Button
                  text={t('Readingsession.translate.input.button')}
                  onClickHandler={submitText}
                />
              </Col>
            </Row>

            <Row noGutters={true} className={`justify-content-md-center ${styles.table}`}>
              <Col md={10}>
                <BootstrapTable
                  wrapperClasses="table-responsive no-gutters"
                  keyField="id"
                  data={ translations }
                  columns={ columns }
                  pagination={ paginationFactory(options) }/>
              </Col>
            </Row>
          </div>
        )
      }

      <Modal show={showStartModal} onHide={handleStartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Readingsession.modal.startsession.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('Readingsession.modal.startsession.paragraph')}</p>
          <TextInput
            value={durationModalInput}
            placeholder={t('Readingsession.modal.startsession.input.placeholder')}
            label={t('Readingsession.modal.startsession.input.placeholder')}
            name="duration"
            type="number"
            onChangeHandler={setDurationModalInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles.closeModalButton}
            text={t('Readingsession.modal.startsession.footer.close')}
            onChangeHandler={handleStartModalClose}
          />
          <Button
            className={styles.modalButton}
            text={t('Readingsession.modal.startsession.footer.start')}
            onClickHandler={startReadingSession}
          />
        </Modal.Footer>
      </Modal>

      <Modal show={showEndModal} onHide={handleEndModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Readingsession.modal.endsession.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('Readingsession.modal.endsession.paragraph')}</p>
          <TextInput
            value={pagesModalInput}
            placeholder={t('Readingsession.modal.endsession.input.placeholder')}
            label={t('Readingsession.modal.endsession.input.placeholder')}
            name="pages"
            type="number"
            onChangeHandler={setPagesModalInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles.closeModalButton}
            text={t('Readingsession.modal.endsession.footer.close')}
            onClickHandler={handleEndModalClose}
          />
          <Button
            className={styles.modalButton}
            text={t('Readingsession.modal.endsession.footer.end')} 
            onClickHandler={endReadingSession}
          />
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  )
}

export default withLocale(ReadingSession)