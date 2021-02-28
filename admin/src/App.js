import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';


function App() {

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Router>
      <div className="wrapper">

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">FoodFunk</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="ml-auto">
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar>

        <div className="main">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/editor">
            <Editor />
          </Route>
        </Switch>
        </div>

      </div>
    </Router>

  );
}

export default App;


function Editor() {
  return (
    <div>
      <h2>Editor</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function Logout() {
  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
}
