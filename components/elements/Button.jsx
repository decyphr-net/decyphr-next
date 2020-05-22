import styles from './button.module.scss'

export default function LinkButton({ children, location }) {
  return <a href={location} className={styles.button}>{children}</a>
}