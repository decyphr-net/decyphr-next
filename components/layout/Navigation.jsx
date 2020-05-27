import styles from './navigation.module.scss'

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <h2>Decyphr</h2>
      <ul>
        <li><a href="">My Library</a></li>
        <li><a href="">Practice</a></li>
        <li><a href="">Profile</a></li>
        <li><a href="">Logout</a></li>
      </ul>
    </nav>
  )
}