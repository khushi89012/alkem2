import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router';
import {BsCart3} from 'react-icons/bs'


function Topnav({logout}) {
  const navigate = useNavigate()
  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" style={{backgroundColor:"rgb(30,70,150)"}}>
      <Container>
        <Navbar.Brand href="#home">ALKEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            
          </Nav>
          <Nav>
        
     
            <Nav.Link eventKey={2} href="">
            <button className="btn btn-danger"  onClick={logout}>Logout</button>
            </Nav.Link>
            <Nav.Link eventKey={2} href="">
            <div  style={{color:"white"}}  onClick={()=>{navigate("/cart")}}><BsCart3 size={41} /></div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topnav;