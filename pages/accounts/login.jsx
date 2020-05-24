import styles from './login.module.scss'
import {TextField} from '../../components/elements/Input'

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.leftPanel}>
        <h1>Welcome to Decyphr</h1>
        <p>Just login to get back to your learning.</p>
        <p>If you don't have an account yet then you can sign up for one here!</p>
      </section>

      <section className={styles.rightPanel}>
        <TextField />
      </section>
    </main>
  )
}