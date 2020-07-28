import React, {createContext,useState} from 'react';

// export const AuthContext = React.createContext(username);

export default createContext({user:'fred'})

// export const authUser = props =>{
//   const [userName,isauthorized] = useState
//     ([{
//      userName : ''
//     },
//     {
//      isauthorized : 'false' 
//   }
//     ]);
// return <AuthContext.User>{props.children}</AuthContext.User> };
    