import * as React from "react";
import { Navigate } from "react-router-dom";
 
// const profileObject = {email:email, lastName:lastName, firstName:firstName, password:password};
export async function createUser(profileObject, navigate){

  const prodUrl = 'https://jamsession-cs467-w2023.uw.r.appspot.com/';
  const devUrl = 'http://localhost:8080/';
  const url = prodUrl;
  
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
  };

  const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'mode': 'no-cors',
      // 'Authorization': `Bearer ${token}`,
  }

  const email = profileObject.email
  const lastName = profileObject.lastName
  const firstName = profileObject.firstName
  const password = profileObject.password

  try{
      function promisedParseJSON(json) {
          return new Promise((resolve, reject) => {
              try {
                  resolve(JSON.parse(json))
              } catch (e) {
                  reject(e)
              }
          })
      }
      
      const userBody = {
          "email": email,
          "name_first": firstName,
          "name_last": lastName,
      }
  
      // create user
      fetch(url + 'users', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(userBody),
      })
      // get response body as object
      .then((responseUser) => responseUser.json())
      // chain user object into creating login (or return false)
      .then(responseUser => {
          console.log(responseUser);
          if(responseUser.cause) {
              return false;
          }
          else {
              const loginBody = {
                  "creation_date": "2000-01-01",
                  "logged_in": 0,
                  "last_login": "2000-01-01",
                  "salted_pass":  password,
                  "user": responseUser._links.user.href,
              }

              console.log(loginBody);

              return fetch(url + 'logins', {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(loginBody),
              });     
          }
      })
      // get response body as object (or return false)
      .then(responseLogin => {
          if(responseLogin) {
              return responseLogin.json();
          }
          else {
              return false;
          }
      })
      // return result
      .then((responseLogin) => {
          if(responseLogin) {
              console.log(responseLogin);
              navigate("/");
              return true;
          }
          else {
              window.alert("Signup Failed - Email Already In Use");
              return false;
          }
      })
  }
  catch(error){
      console.log(error)
  }
}