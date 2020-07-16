import React from 'react'
import { Row, Col } from 'react-bootstrap'
import withLocale from '../../../i18n/hoc/withLocale'
import useTranslation from '../../../i18n/hooks/useTranslation'
import DashboardLayout from '../../../components/layout/dashboard'
import { Button } from '../../../components/elements/Button'
import api from '../../../utils/api'
import { TextInput } from '../../../components/elements/Input'
import { Session } from '../../../types/practice'

function Feedback(props) {
  if (props.correct) {
    return <p>props.correctText</p>
  } else if (!props.correctAnswer) {
    return <></>
  } else {
    return <p>{props.isIncorrectText}{' '}${props.correctAnswer}</p>
  }
}

const PracticeSession: React.FC = () => {
  const { locale, t } = useTranslation()
  const [session, setSession] = React.useState<Session>({
    id: 0,
    user: 0,
    question_set: [],
    score: 0,
    duration: ''
  })
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [answer, setAnswer] = React.useState<any>({})
  const [currentGuess, setCurrentGuess] = React.useState('')
  const [score, setScore] = React.useState(0)
  const [timeStarted, setTimeStarted] = React.useState<Date>()
  const [startButtonClass, setSartButtonClass] = React.useState('')
  const [errors, setErrors] = React.useState({})

  const handleSessionStart = data => {
    setSession(data)
    setTimeStarted(new Date());
    setSartButtonClass('d-none')
  }

  const startSession = async () => {
    await api('POST', 'practiceSessions', handleSessionStart, setErrors, true, {})
  }

  const handleEndData = data => {
    setScore(data.score)
  }

  const millisToMinutesAndSeconds = millis => {
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return '00:' + (minutes < 10 ? '0' : '') + minutes + ":" + (+seconds < 10 ? '0' : '') + seconds
  }

  const endSession = async () => {
    let durationAsMilliseconds = new Date().getTime() - timeStarted.getTime()

    let duration = millisToMinutesAndSeconds(durationAsMilliseconds)

    let data = {
        "duration": duration
    }

    await api('PUT', 'practiceSessions', handleEndData, setErrors, true, data, null, session.id.toString())
  }

  const handleAnsweredQuestion = data => {
    setAnswer(data)
    setCurrentQuestion(currentQuestion + 1)
    setCurrentGuess('')

    if (currentQuestion === 4) {
      endSession()
    }
  }

  const submitGuess = async id => {
    let data = {
      guess: currentGuess
    }
    await api('PUT', 'questions', handleAnsweredQuestion, setErrors, true, data, null, id)
  }

  return (
    <DashboardLayout
      title={t('Practicesession.page.title')}
      pageTitle={t('Practicesession.page.header')}
      pageSubtitle={t('Practicesession.page.subheading')}
    >
      <Row noGutters={true} className="justify-content-md-center">
        <Col className={"text-center"}>
          <Button
            className={startButtonClass}
            text={t('Practicesession.session.startbutton')}
            onClickHandler={startSession}
          />
        </Col>
      </Row>
      <Row noGutters={true} className="justify-content-md-center">
        <Col className={"text-center"}>
          {session.question_set.length > 0
            ? (currentQuestion === 5
              ? (
                <p>{t("Practicesession.session.ended")}{' '}{score}</p>
              ) : (
                <>
                {session.question_set[currentQuestion].translation.source_text}
                  <br />
                  <TextInput
                    placeholder={t('Practicesession.guess.inputplaceholder')}
                    label={t('Practicesession.guess.inputlabel')}
                    name="guess"
                    type="text"
                    onChangeHandler={setCurrentGuess}
                    value={currentGuess}
                  />
                  <Button
                    text={t('Practicesession.button.text')}
                    onClickHandler={() => submitGuess(session.question_set[currentQuestion].id)}
                  />
                  
                  <Feedback
                    correct={answer.correct}
                    correctAnswer={answer.correct_answer}
                    isCorrectText={t('Practicesession.feedback.correct')}
                    isIncorrectText={t('Practicesession.feedback.incorrect')}
                  />
                </>
              )
            ) : <></>
          }
        </Col>
      </Row>
    </DashboardLayout>
  )
}

export default withLocale(PracticeSession)