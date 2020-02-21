import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

import Dashboard from './Components/Dashboard/Dashboard';
import Editor from './Components/Editor/Editor';


class App extends React.Component {

  noMatch({ location }) {
    return (
      <div>
        <h3>
          Error 404 Page not found: <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
 
  render() {   
    
    return (

      <div className="wrapper">
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">FoodFunk</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="/create">New</Nav.Link>
                <Nav.Link href="#link">Preview</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
              <Nav.Link href="#link">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="main">
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/create" component={Editor} />
              <Route path="/edit" component={Editor} />
              <Route component={this.noMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }

}

export default App;
