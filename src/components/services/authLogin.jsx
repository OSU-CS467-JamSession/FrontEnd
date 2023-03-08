import { getAllUsersQ } from "./getUsers";
import { getThisUserQ } from "./getThisUser";

export async function authLogin(email) {
  const response = await getAllUsersQ();

  const users = response._embedded.users;

    var arrayLength = users.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(users[i].email, email);
        if (users[i].email == email){
            console.log("true")

            return users[i].user_id}
    }
  }

  return false;
}

export function isLogin(email, navigate) {
  const auth = authLogin(email).then(function (result) {
    if (result) {
      navigate("./Profile", { state: result });
    } else {
      window.alert("Invalid Log in");
    }
  });
}
