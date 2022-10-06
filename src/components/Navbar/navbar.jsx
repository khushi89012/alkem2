import {Container, Button} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Sidebar} from '../Sidebar/Sidebar'
import { Pdfmaker } from '../Download/sample';
function Topnav({handlePrint}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">ScoreCard Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"><Sidebar/></Nav.Link>            
          </Nav>
          <Button onClick={()=>{handlePrint()}}>Print</Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topnav;