import { FormattedMessage } from 'react-intl'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.firstHeading}>
        <FormattedMessage id="Index.header.heading" defaultMessage="Accelerate Language Learning With Decyphr" />
      </h1>

      <p className={styles.paragraph}>
        <FormattedMessage
          id="Index.header.paragraph"
          defaultMessage="Start reading with Decyphr today and define your own personalized learning material!" />
      </p>
    </header>
  )
}