import Link from 'next/link'
import styles from './navigation.module.scss'

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <h2>Decyphr</h2>
      <ul>
        <li>
          <Link href="/library">
            <a>My Library</a>
          </Link>
        </li>
        <li><a href="">Practice</a></li>
        <li><a href="">Profile</a></li>
        <li><a href="">Logout</a></li>
      </ul>
    </nav>
  )
}