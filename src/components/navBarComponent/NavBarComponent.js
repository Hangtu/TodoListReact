import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./NavBarComponent.scss";

function NavBarComponent() {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand className="text-light">Todo List App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default  React.memo(NavBarComponent);
