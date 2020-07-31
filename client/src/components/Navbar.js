import React,{ useEffect, useState, useCallback } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../authorize/AuthService';
import  { Redirect } from 'react-router-dom'
let content = 'here is your body'


function Navbar({ response }) {
    const [isFetching, setFetching] = useState(false);
    const [User, setUser] = useState([]);
    const [UserName,setUserName] = useState([]);
    useEffect(function fetch() {
      (async function() {
        setFetching(true);
        setUser(await AuthService.isAuthenticated(response));
        setFetching(false);
      })();
    }, [response]);
    
    if (isFetching) {
      return <div>Fetching page</div>;
    }
    // let player = JSON.parse(User)
    console.log('user',User)
    if (User.isAuthenticated){
        return NavbarFinal();
    }else{
    return <div>piss off I'm busy</div>}
    
  }




const NavbarFinal = props =>{
   const LogoutHandler = (()=>{
        AuthService.logout().then(() => {
            props.history.push("/");
          });
    })

   

    
    
    
    // const [content] = useState();
    
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <button type="button" 
                        className="btn btn-link nav-item nav-link" 
                       to="/"
                            onClick={LogoutHandler}
                            >Logout</button>
                           
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                   
                </ul>
            </div>
        </nav>
        {content}
        </div>
    )
}

export default Navbar;