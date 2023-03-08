export async function createUser(profileObject, navigate) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
  };

  try {
    function promisedParseJSON(json) {
      return new Promise((resolve, reject) => {
        try {
          resolve(JSON.parse(json));
        } catch (e) {
          reject(e);
        }
      });
    }
    const email = profileObject.email;
    const lastName = profileObject.lastName;
    const firstName = profileObject.firstName;
    const password = profileObject.password;

    const body = {
      email: email,
      name_first: firstName,
      name_last: lastName,
      password: password,
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      // 'Authorization': `Bearer ${token}`,
    };
    console.log(body);
    const response = await fetch(
      "https://jamsession-cs467-w2023.uw.r.appspot.com/users",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    response.json().then((response) => {
      console.log("here");
      navigate("./");

      return response.ok;
    });
  } catch (error) {
    console.log(error);
  }
}
