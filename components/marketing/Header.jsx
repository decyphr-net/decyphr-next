import { FormattedMessage } from 'react-intl'
import LinkButton from '../elements/Button'
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

      <p className={styles.callToAction}>
        <LinkButton location="#about">
          <FormattedMessage
            id="Index.header.discovermore"
            defaultMessage="Find Out More!"
            />
        </LinkButton>
        <LinkButton location="#about">
          <FormattedMessage
            id="Index.header.calltoaction"
            defaultMessage="Get Access Now!"
            />
        </LinkButton>
      </p>
      
    </header>
  )
}