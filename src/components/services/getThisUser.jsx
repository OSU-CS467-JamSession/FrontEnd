export async function getThisUserQ(user_id){

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
        
        var base_url =  'https://jamsession-cs467-w2023.uw.r.appspot.com/users/'
        return await fetch(base_url.concat(user_id), requestOptions)
        .then((response) => response.json())
        .then((user) => {
          var userObject = {
            email : user.email,
            name_first : user.name_first,
            name_last : user.name_last,
            birthdate : user.birthdate,
            location_zipcode : user.location_zipcode,
            location_city : user.location_city,
            location_state : user.location_state,
            experience : user.experience,
            user_id : user.user_id,
        }

        return userObject
        });
    }catch(error){
        console.log(error)
        return []
    }
}