import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'

export default function Navigation() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Decyphr</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <Link href="/library">
            <a>My Library</a>
          </Link>
        </Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar>
  )
}