import { FormattedMessage } from 'react-intl'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.firstHeading}>
        <FormattedMessage id="Index.header" defaultMessage="Accelerate Your Learning With Decyphr" />
      </h1>
    </header>
  )
}