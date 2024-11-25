import React from "react";
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importando os componentes do Bootstrap
import { useUser } from "../context/UserProvider";
export function Navegacao() {
  const {logout} = useUser()
 
  function handleLogout(){
    logout()
  }

  return (
    
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/medicamentoForm">Cadastrar Medicamento</Nav.Link>
              <Nav.Link as={Link} to="/medicamentoLista">Lista de Medicamentos</Nav.Link>
              <Nav.Link as={Link} onClick={handleLogout} to="/">Sair</Nav.Link>

            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
  );
}
