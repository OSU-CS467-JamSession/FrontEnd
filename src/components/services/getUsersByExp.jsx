
export async function getUsersByExpQ(exp){

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
    };

    const base_url = 'https://jamsession-cs467-w2023.uw.r.appspot.com/users/search/findByExperienceGreaterThanEqual?experience='
    
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
    
        const response = await fetch(base_url.concat(exp), requestOptions);
        return response.json()

    }catch(error){
        console.log(error)
        return []
    }
}

export async function getUsersByExp(exp){

    var arr = []
    const response = await getUsersByExpQ(exp)

    const users = response._embedded.users

    var arrayLength = users.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log(users[i].email, email);
        arr.push(users[i].email);

    }
    // console.log("arr",arr)
    return arr

} 