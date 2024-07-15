import { Nav } from "react-bootstrap";
import { Inter } from "next/font/google";
import { faEdit, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const inter = Inter({
  subsets: ["latin"],
});

export default function MenuTabComponent() {
  const router = useRouter();

  return (
    <Nav
      defaultActiveKey="/blog"
      activeKey={router.pathname}
      className={`flex-column ${inter.className} px-2`}
    >
      <Nav.Link href="/blog" className="text-dark-green">
        <FontAwesomeIcon className="me-2" icon={faHome} />
        <span>Home</span>
      </Nav.Link>
      <Nav.Link href="/our-blog" className="text-dark-green">
        <FontAwesomeIcon className="me-2" icon={faEdit} />
        <span>Our Blog</span>
      </Nav.Link>
    </Nav>
  );
}
