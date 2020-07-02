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
        <Nav.Link>
          <Link href="/[lang]/library" as={`/${locale}/library`}>
            <a>My Library</a>
          </Link>
        </Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default withLocale(Navigation)