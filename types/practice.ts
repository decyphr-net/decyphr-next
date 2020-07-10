import Translation from './translation'

export interface Session {
  id: number
  user: number
  question_set: Array<Question>
  score?: number
  duration?: string
}

export interface Question {
  id: number
  translation: Translation
  correct_answer: string
  answer_provided?: string
  correct?: boolean
}