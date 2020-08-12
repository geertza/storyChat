import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import login from './components/login'
import chat from './components/lobby'
import reg from './components/Register'




function App() {

  
  return (
    
    <Router>

        <div>

        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/reg" component={reg} />
          {/* <Route exact path="/user/logout" component={login} /> */}
          <Route path="/chat" component={chat} />
        </Switch>
      </div>
     
    </Router>
   
  );
}


export default App;
