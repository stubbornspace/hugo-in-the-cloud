import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
      <div>
        <Router>

          <Navbar expand="lg" variant="light" bg="light">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            FoodFunk
          </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Item>
                <Link to= {{ pathname:"/"}} className="nav-link">
                  Dashboard
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to= {{ pathname:"/create"}} className="nav-link">
                  New Post
                </Link>
              </Nav.Item>
            </Nav>
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
