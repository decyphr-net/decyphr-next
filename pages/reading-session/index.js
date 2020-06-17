import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import DashboardLayout from '../../components/layout/dashboard'

export default class Session extends React.Component {
  state = {
    book: {},
    showModal: false,
    durationModalInput: '',
    sessionStatus: 'N'
  }

  componentDidMount = () => {
    let readingSessions = JSON.parse(localStorage.getItem('library'))
    let session = readingSessions.find(session => {
      return session.book.id == Router.query['id']
    })

    this.setState({'book': session.book})
  }

  static getInitialProps({ query }) {
    return { query }
  }

  handleModalOpen = () => this.setState({'showModal': true})
  handleModalClose = () => this.setState({'showModal': false})

  render() {
    return (
      <>
        <Head>
          <title>Reading Session</title>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
        </Head>

        <DashboardLayout pageTitle={this.state.book.title} pageSubtitle="">
          <Row noGutters={true} className="justify-content-md-center">
            <Col xs={10}>
              <Button onClick={this.handleModalOpen}>Start Reading Now!</Button>
            </Col>
          </Row>

          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Start a new session?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>How long would you like to read for?</p>
              <input type="number" placeholder="Number of minutes" onChange={e => e.target.value} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.startReadingSession}>
                Start Session
              </Button>
            </Modal.Footer>
          </Modal>
        </DashboardLayout>
      </>
    )
  }
}