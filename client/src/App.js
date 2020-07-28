import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import auth from './Context/AuthContext';
import "./App.css";
import login from './components/login'
function App() {
  

  
  
  return (
    <auth.Provider>
    <Router>

        <div>

        <Switch>
          <Route exact path="/" component={login} />
          
         
        </Switch>
      </div>
     
    </Router>
    </auth.Provider>
  );
}


export default App;
