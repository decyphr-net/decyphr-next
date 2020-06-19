import React from 'react'
import Router from 'next/router'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import api from '../../utils/api'
import DashboardLayout from '../../components/layout/dashboard'

export default class Session extends React.Component {
  state = {
    libraryItem: 0,
    book: {},
    showStartModal: false,
    showEndModal: false,
    durationModalInput: '',
    sessionStatus: 'N',
    minutes: 0,
    seconds: 0,
    timerText: '',
    errors: {}
  }

  /**
   * Get the query parameter from the from the URL so that it will be
   * accessible on this page, which will allow us to determine which book
   * is being read
   * 
   * @param {*} query
   */
  static getInitialProps({ query }) {
    return { query }
  }

  componentDidMount = () => {
    let readingSessions = JSON.parse(localStorage.getItem('library'))
    let session = readingSessions.find(session => {
      return session.book.id == Router.query['id']
    })
    this.setState({'libraryItem': session.id})
    this.setState({'book': session.book})
  }

  updateTimerText = () => {
    if (this.state.seconds < 10) {
      this.setState({
        'timerText': `Time Remaining: ${this.state.minutes}:0${this.state.seconds}`
      })
    } else {
      this.setState({
        'timerText': `Time Remaining: ${this.state.minutes}:${this.state.seconds}`
      })
    }
  }

  countdown = () => {
    this.interval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.interval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
      this.updateTimerText();
    }, 1000);
  }

  /**
   * Once the information has successfully come back from the API, we'll just
   * update some items of state on the page.
   * 
   * The first thing that we'll do is parse the duration value and split it
   * into minutes and seconds and add them to the component state.
   * 
   * Then we'll just close the modal start the countdown.
   * 
   * @param {obj} data 
   */
  handleSessionCreation = data => {
    this.setState({'minutes': data.duration.split(":")[1] - 1 })
    this.setState({'seconds': 59})
    this.handleModalClose()
    this.countdown()
  }

  handleErrors = data => {
    console.dir(data)
  }

  startReadingSession = () => {
    let data = {
      'library_item': this.state.libraryItem,
      'pages': 0.0,
      'duration': `00:${this.state.durationModalInput}:00`,
      'status': 'I'
    }

    api({
      method: 'POST',
      endpointName: 'readingSession',
      data: data,
      setState: this.handleSessionCreation,
      setErrors: this.handleErrors,
      authRequired: true
    })
  }

  handleStartModalOpen = () => this.setState({'showStartModal': true})
  handleEndModalOpen = () => this.setState({'showEndModal': true})
  handleStartModalClose = () => this.setState({'showStartModal': false})
  handleEndModalClose = () => this.setState({'showEndModal': false})

  render() {
    return (
      <DashboardLayout title="Reading Session" pageTitle={this.state.book.title} pageSubtitle="">
        <Row noGutters={true} className="justify-content-md-center">
          <Col xs={10}>
            <Button
              className={this.state.startButtonClass}
              onClick={this.handleStartModalOpen}
            >
              Start Reading Now!
            </Button>

            <Button
              className={this.state.endSessionButtonClass}
              onClick={this.handleEndModalOpen}
            >
              End Session
            </Button>
          </Col>
        </Row>

        <Row noGutters={true} className="justify-content-md-center">
          <Col xs={10}>
            <p>{this.state.timerText}</p>
          </Col>
        </Row>

        <Modal show={this.state.showStartModal} onHide={this.handleStartModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Start a new session?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>How long would you like to read for?</p>
            <input
              type="number"
              placeholder="Number of minutes"
              onChange={e => this.setState({'durationModalInput': e.target.value})}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleStartModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.startReadingSession}>
              Start Session
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEndModal} onHide={this.handleEndModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Finish early?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>How many pages did you read?</p>
            <input
              type="number"
              placeholder="How many pages did you read?"
              onChange={e => this.setState({'durationModalInput': e.target.value})}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleEndModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.startReadingSession}>
              End Session
            </Button>
          </Modal.Footer>
        </Modal>
      </DashboardLayout>
    )
  }
}