import { getAllUsersQ } from "./getUsers";

export async function authLogin(email){
        
    const response = await getAllUsersQ()

    const users = response._embedded.users

    var arrayLength = users.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(users[i].email, email);
        if (users[i].email == email){
            console.log("true")
            return true}
    }

    return false 
}

export function isLogin(email,password, profileObject, navigate){
    const auth = authLogin(email).then(function(result) {
        console.log("result",result)
        if(result == true){
            navigate('./Profile', {state: profileObject})
        }else{
            window.alert("Invalid Log in");}
        })

} 
