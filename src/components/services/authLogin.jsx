import { getAllUsers } from "./getUsers";

export async function authLogin(email){
        
    const response = await getAllUsers()

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