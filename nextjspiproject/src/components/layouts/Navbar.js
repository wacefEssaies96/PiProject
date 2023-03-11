import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import nextCookie from 'next-cookies'

function Navigationbar(ctx) {

  const {user} = nextCookie(ctx)

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Health SpotLight</Navbar.Brand>
        <Container>
          <Navbar.Brand type="button" className='btn btn-success'><Link href={'/login'}>sign in</Link></Navbar.Brand>
          <Navbar.Brand type="button" className='btn btn-warning'><Link href={'/register'}>register</Link></Navbar.Brand>
          {user !== undefined && <Navbar.Brand type="button" className='btn btn-info'><Link href={'/editProfile'}>edit profile</Link></Navbar.Brand>}
        </Container>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Health SpotLight
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown
                title="Admin"
                id={`offcanvasNavbarDropdown-expand-lg`}
              >
                <NavDropdown.Item href="#action3">User Management</NavDropdown.Item>
                <NavDropdown.Item href="/admin/sport-type">Sport Type Management</NavDropdown.Item>
                <NavDropdown.Item href="/admin/sport-sub-type">Sport SubType Management</NavDropdown.Item>
                <NavDropdown.Item href="/article/admin">Article Management</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Product Management</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Appointement Management</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Contact
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;