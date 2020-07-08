import React from 'react'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'
import withLocale from '../../i18n/hoc/withLocale'
import useTranslation from '../../i18n/hooks/useTranslation'

const Navigation: React.FC = () => {
  const { locale, t } = useTranslation()

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Decyphr</Navbar.Brand>
      <Nav className="mr-auto">
        <Link href="/[lang]/library" as={`/${locale}/library`}>
          <a>My Library</a>
        </Link>
        <Link href="/[lang]/practice" as={`/${locale}/practice`}>
          <a>Practice</a>
        </Link>
      </Nav>
    </Navbar>
  )
}

export default withLocale(Navigation)