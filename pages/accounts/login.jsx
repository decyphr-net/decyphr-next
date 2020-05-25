import { FormattedMessage } from 'react-intl'
import styles from './login.module.scss'

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.leftPanel}>
        <h1>
          <FormattedMessage
            id="Accounts.login.leftpanel.header"
            defaultMessage="Welcome to Decyphr" />
        </h1>
        <p>
          <FormattedMessage
            id="Accounts.login.leftpanel.helpparagraph"
            defaultMessage="Just login to get back to your learning." />
          </p>
        <p>
          <FormattedMessage
            id="Accounts.login.leftpanel.signupprompt"
            defaultMessage="If you don't have an account yet then you can sign up for one here!" />
          </p>
        <p>
          <FormattedMessage
            id="Accounts.login.leftPanel.forgotpasswordprompt"
            defaultMessage="Or, if you have forgotten your password, click here!" />
        </p>
      </section>

      <section className={styles.rightPanel}>
        <h2>Login To Decyphr</h2>
        <form>
          
          <input className={styles.formInput} placeholder="Email" name="email" type="text" />
          <input className={styles.formInput} placeholder="Password" name="password" type="password" />
          <button className={styles.formButton}>Login!</button>
        </form>
        
      </section>
    </main>
  )
}