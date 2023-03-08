export async function authenticateUserQ(credentialsObject){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
    };

    const prodUrl = 'https://jamsession-cs467-w2023.uw.r.appspot.com/';
    const devUrl = 'http://localhost:8080/';
    const url = prodUrl;

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
        const email = credentialsObject.email
        const password = credentialsObject.password

        const body = {
            "email": email,
            "password": password
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'mode': 'no-cors',
            // 'Authorization': `Bearer ${token}`,
        }
        console.log(body)

        const response = await fetch(url + 'login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })

        const parsedValue = await response.json();

        const responseObject = {status: response.status, content: parsedValue};
        console.log(responseObject);
        return responseObject;
    }
    catch(error){
        console.log(error)
    }
}