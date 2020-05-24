import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        {'Copyright © Decyphr '}{new Date().getFullYear()}
      </p>
    </footer>
  )
}