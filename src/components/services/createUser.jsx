// const profileObject = {email:email, lastName:lastName, firstName:firstName, password:password};
export async function createUser(profileObject, navigate) {
  const prodUrl = "https://jamsession-cs467-w2023.uw.r.appspot.com/";
  const devUrl = "http://localhost:8080/";
  const url = prodUrl;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    mode: "no-cors",
  };

  const lastName = profileObject.lastName;
  const firstName = profileObject.firstName;
  const birthdate = profileObject.birthdate;
  const experience = profileObject.experience;
  const locationZipcode = profileObject.locationZipcode;
  const locationCity = profileObject.locationCity;
  const locationState = profileObject.locationState;
  const password = profileObject.password;
  const email = profileObject.email;

  try {
    const userBody = {
      name_first: firstName,
      name_last: lastName,
      birthdate: birthdate,
      experience: experience,
      location_zipcode: locationZipcode,
      location_city: locationCity,
      location_state: locationState,
      email: email,
    };

    // create user
    fetch(url + "users", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userBody),
    })
      // get response body as object
      .then((responseUser) => responseUser.json())
      // chain user object into creating login (or return false)
      .then((responseUser) => {
        console.log(responseUser);
        if (responseUser.cause) {
          return false;
        } else {
          const loginBody = {
            creation_date: "2000-01-01",
            logged_in: 0,
            last_login: "2000-01-01",
            salted_pass: password,
            user: responseUser._links.user.href,
          };

          console.log(loginBody);

          return fetch(url + "logins", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(loginBody),
          });
        }
      })
      // get response body as object (or return false)
      .then((responseLogin) => {
        if (responseLogin) {
          return responseLogin.json();
        } else {
          return false;
        }
      })
      // return result
      .then((responseLogin) => {
        if (responseLogin) {
          console.log(responseLogin);
          navigate("/");
          return true;
        } else {
          window.alert("Signup Failed - Email Already In Use");
          return false;
        }
      });
  } catch (error) {
    console.log(error);
  }
}
