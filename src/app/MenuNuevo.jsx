import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import Nuevo from './Nuevo.css'
import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Inicio from './page.js'
function MenuNuevo() {
  return (
    
      
    <Nav variant="pills" className='Vertical'>
    <Nav.Item>
    <Button className="button-link">
      <Link href="/">INICIO</Link>
    </Button>
    <br></br>
    <Button className="button-link">
      <Link href="/">DATOS DE PERFIL</Link>
    </Button>
    <br></br>
    <Button className="button-link">
      <Link href="/">VER TARJETAS</Link>
    </Button>
    <br></br>
    <Button className="button-link">
      <Link href="/">INGRESOS Y GASTOS</Link>
    </Button>
    <br></br>
    <Button className="button-link">
      <Link href="/">ACTUALIZAR</Link>
    </Button>
    <br></br>
    <Button className="button-link">
      <Link href="/">INFORME</Link>
    </Button>
    <br></br>
    <Button className="button-link">
      <Link href="./Terms">TERMINOS Y CONDICIONES</Link>
    </Button>
    </Nav.Item>
    
  </Nav>
      
      /*<Navbar className="Vertical">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Inicio">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>*/
      
  );
}

export default MenuNuevo;