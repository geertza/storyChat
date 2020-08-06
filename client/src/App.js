import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import login from './components/login'
// import lobby from './components/Navbar'
import chat from './components/chat'
// import test from './components/test'




function App() {

  
  return (
    
    <Router>

        <div>

        <Switch>
          <Route exact path="/" component={login} />
          {/* <Route exact path="/lobby" component={test} /> */}
          <Route exact path="/user/logout" component={login} />
          <Route path="/chat" component={chat} />
        </Switch>
      </div>
     
    </Router>
   
  );
}


export default App;
