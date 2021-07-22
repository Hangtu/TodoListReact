import React from "react";
import NavBarComponent from "./components/navBarComponent/NavBarComponent";
import TodoListComponent from "./components/todoListComponent/TodoListComponent";
import { Container } from "react-bootstrap";
function App() {
  return (
    <React.Fragment>
      <NavBarComponent />
      <Container fluid>
        <TodoListComponent />
      </Container>
    </React.Fragment>
  );
}

export default App;
