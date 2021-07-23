import React from "react";
import { Navbar, Container } from "react-bootstrap";

function NavBarComponent() {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand className="text-light">Todo List App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default  NavBarComponent;
