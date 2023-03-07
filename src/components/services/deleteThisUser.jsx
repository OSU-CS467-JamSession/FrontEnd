export async function deleteThisUserQ(user_id){

    const requestOptions = {
        method: 'DELETE',
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
        console.log('https://jamsession-cs467-w2023.uw.r.appspot.com/users/'.concat(user_id))
        var base_url =  'https://jamsession-cs467-w2023.uw.r.appspot.com/users/'
        
        return await fetch(base_url.concat(user_id), requestOptions)
        .then((response) => response.json())
        .then((user) => {
            return true
        });
    }catch(error){
        console.log(error)
        return false
    }
}