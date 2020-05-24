import Link from 'next/link'
import styles from './button.module.scss'

export default function LinkButton({ children, location }) {
  return (
    <Link  href={location}>
      <a className={styles.button}>{children}</a>
    </Link>
  )
}