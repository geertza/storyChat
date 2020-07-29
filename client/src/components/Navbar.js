import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import  { Redirect } from 'react-router-dom'

const Navbar = props =>{
    // const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const LogoutHandler = (()=>{
        AuthService.logout().then(() => {
            props.history.push("/");
          });
    })

   

    
    return(
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
    )
}

export default Navbar;