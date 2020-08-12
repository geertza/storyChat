
export default {
    login : user =>{
        console.log(user);
        return fetch("/user/login",{
            method : "post",
            body: JSON.stringify(user),
            headers : {
                "Content-Type" : "application/json;charset=UTF-8",
                "Accept" : "application/json, text/plain, */*"
             }
        }).then(res => {
            if(res.status !== 200)
                {return { isAuthenticated : false, user : {username : ""}};}
               
            else{
                console.log('good'); 
                return {
                    isAuthenticated: true, 
                    user: {
                        username: "andy"
                    }
                };
            }
        })
    },
    register : user =>{
        console.log(user);
        return fetch('/user/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    },
    logout : ()=>{
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : ()=>{
        return fetch('/user/user', {credentials: 'include'})
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {username : "",role : ""}};
                });
    }

}