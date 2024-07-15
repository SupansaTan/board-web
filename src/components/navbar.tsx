import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Castoro } from "next/font/google";

const castoro = Castoro({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export default function NavbarComponent() {
  return (
    <Navbar expand={"md"} sticky="top" variant="dark" bg="dark-green">
      <Container fluid>
        <Navbar.Brand href="#" className={castoro.className}>
          a Board
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          variant="dark"
          bg="dark-green"
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
            <Button variant="outline-success">Sign In</Button>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
