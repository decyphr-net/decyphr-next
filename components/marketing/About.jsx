import { FormattedMessage } from 'react-intl'
import styles from './about.module.scss'

export default function About() {
  return (
    <article className={styles.about}>
      <h2>
        <FormattedMessage id="Index.about.firstheader" defaultMessage="What does Decyphr do?" /></h2>
      <p>
        <FormattedMessage id="Index.about.firstparagraph" defaultMessage="Decyphr was built to help you translate text from the language that your are learning in to your own native language." />
      </p>
      
      <p>
        <FormattedMessage id="Index.about.secondparagraph" defaultMessage="While learning to read a new book you can translate your text and get a breakdown of the structure of your translation, as well as an audio clip so you can also get an idea of what the text should sound like in the original text." />
      </p>

      <p>
        <FormattedMessage id="Index.about.thirdparagraph" defaultMessage="Decyphr will take the text that you have translated and generate quizzes for you to allow you to practice, meaning you create the context for your learning from the books that you are reading." />
      </p>
    </article>
  )
}