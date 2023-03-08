import { authenticateUserQ } from "./authenticateUser";
import { getThisUserQ } from "./getThisUser";

export async function authLogin(email, password){
    
    let credentialsObject = {email: email, password: password};
    const responseObject = await authenticateUserQ(credentialsObject);
    return (responseObject);
}

export function isLogin(email, password, navigate){
    const auth = authLogin(email, password).then(function(result) {
        console.log("result",result)

        if(result.status == 200){
            navigate('./Profile', {state: result.content});
        }
        else if(result.status == 404){
            window.alert("Invalid Login - User Not Found");
        }
        else{
            window.alert("Invalid Login - Incorrect Password");
        }
    })
} 
