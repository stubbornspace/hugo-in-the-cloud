import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

import Dashboard from './Views/Dashboard';
import Editor from './Views/Editor';

/**
 * logout
 */

function App() {

  return (
    <Router>
      <div className="wrapper">

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">FoodFunk</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Nav.Link href="/">home</Nav.Link>
            <Nav.Link href="/editor/<filename>.md">new</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="main">
        <Switch>
          <Route exact path="/"><Dashboard /></Route>
          <Route path="/logout"><Logout /></Route>
          <Route path={"/editor/:file"}><Editor /></Route>
        </Switch>
        </div>

      </div>
    </Router>

  );
}

export default App;


function Logout() {
  return (
    <div>
      Logout
    </div>
  );
}
