import * as React from "react";
import { Navigate } from "react-router-dom";

export async function createUser(profileObject, navigate) {
  try {
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
      return response.ok;
    });
  } catch (error) {
    console.log(error);
  }
}
