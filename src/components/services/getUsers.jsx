
export async function getAllUsers(){

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
    };

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
        const response = await fetch('https://jamsession-cs467-w2023.uw.r.appspot.com/users', requestOptions);

        //console.log(response)
        
 
        return response.json()

    }catch(error){
        console.log(error)
        return []
    }

}