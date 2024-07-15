import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Castoro, IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRootState } from "@/utils/context/RootStateContext";
import Avatar from "react-avatar";
import {
  faArrowRight,
  faEdit,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({
  subsets: ["latin"],
});

const castoro = Castoro({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const IBMPlexSans = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: "400",
});

export default function NavbarComponent() {
  const [isShowCanvas, setIsShowCanvas] = useState(false);
  const { state } = useRootState();
  const router = useRouter();

  const SignInButton: React.FC = () => {
    return (
      <Button
        className={`btn-success fw-semibold px-4 ${IBMPlexSans.className}`}
        onClick={() => router.push("/sign-in")}
      >
        Sign In
      </Button>
    );
  };

  const NavMenu: React.FC = () => {
    return (
      <Nav
        defaultActiveKey="/blog"
        activeKey={router.pathname}
        className={`flex-column ${inter.className}`}
      >
        <Nav.Link href="/blog" className="text-white">
          <FontAwesomeIcon className="me-2" icon={faHome} />
          <span>Home</span>
        </Nav.Link>
        <Nav.Link href="/our-blog" className="text-white">
          <FontAwesomeIcon className="me-2" icon={faEdit} />
          <span>Our Blog</span>
        </Nav.Link>
      </Nav>
    );
  };

  const UserInfoSection: React.FC = () => {
    return state.user?.username ? (
      <div className={`flex justify-items-end ${inter.className}`}>
        <span className="me-2 text-white">{state.user.username}</span>
        <Avatar name={state.user.username} size="30" round={true} />
      </div>
    ) : (
      <SignInButton />
    );
  };

  return (
    <Navbar expand={"md"} sticky="top" variant="dark" bg="dark-green">
      <Container className="mx-2" fluid>
        <Navbar.Brand href="#" className={castoro.className}>
          a Board
        </Navbar.Brand>

        <Navbar.Toggle
          className="d-lg-none"
          onClick={() => setIsShowCanvas(true)}
          aria-controls={`offcanvasNavbar-expand`}
        />
        <Navbar.Offcanvas
          variant="dark"
          className="bg-dark-green d-lg-none"
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
          show={isShowCanvas}
          onHide={() => setIsShowCanvas(false)}
        >
          <Offcanvas.Header>
            <FontAwesomeIcon
              className="me-2 text-white cursor-pointer"
              onClick={() => setIsShowCanvas(false)}
              icon={faArrowRight}
            />
          </Offcanvas.Header>
          <Offcanvas.Body>
            {state.user.username ? <NavMenu /> : <SignInButton />}
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <div className="d-none d-lg-block">
          <UserInfoSection />
        </div>
      </Container>
    </Navbar>
  );
}
