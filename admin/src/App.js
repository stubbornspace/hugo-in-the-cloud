import React from "react";
import {BrowserRouter, Switch,Route} from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react';
import awsConfig from './aws_config'

import Dashboard from './Views/Dashboard';
import Editor from './Views/Editor';


Amplify.configure(awsConfig);
Amplify.Logger.LOG_LEVEL = 'DEBUG';

const loginTheme = {
  sectionFooterSecondaryContent:{
    ...AmplifyTheme.sectionFooterSecondaryContent,
    display:"none"
  }
};

const signOut = () =>{
  Auth.signOut();
  window.location.reload();
}

const App =() => {

  return (
    <BrowserRouter basename={'/admin'}>
      <div className="wrapper">

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">FoodFunk</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Nav.Link href="/">home</Nav.Link>
            <Nav.Link href="/editor/<filename>.md">new</Nav.Link>
            <Nav.Link href="/" onClick={signOut}>logout</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="main">
        <Switch>
          <Route exact path="/"><Dashboard /></Route>
          <Route path={"/editor/:file"}><Editor /></Route>
        </Switch>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default withAuthenticator(App, false, [], null, loginTheme);
