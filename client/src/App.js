import React, { useState,useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import login from './components/login'
function App() {
  
  
  
  
  return (
    <Router>

        <div>

        <Switch>
          <Route exact path="/" component={login} />
          
         
        </Switch>
      </div>
    </Router>

  );
}


export default App;
