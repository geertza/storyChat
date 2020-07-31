import React,{Redirect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import auth from './Context/AuthContext';
import "./App.css";
import login from './components/login'
import lobby from './components/Navbar'

 function isAuthenticated(address){
  return fetch('/user/authenticated')
          .then(res=>{
            console.log('go')
              if(res.status !== 401)
              console.log('good')
              else
              console.log('bad')
          });
}




function App() {

  
  return (
    <auth.Provider>
    <Router>

        <div>

        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/lobby" component={lobby} />
          <Route exact path="/user/logout" component={login} />
        </Switch>
      </div>
     
    </Router>
    </auth.Provider>
  );
}


export default App;
