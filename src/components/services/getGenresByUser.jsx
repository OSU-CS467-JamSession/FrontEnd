export async function getGenresByUserQ(user_id){

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
        return await fetch(base_url.concat(user_id).concat('/genres'), requestOptions)
        .then((response) => response.json())
        .then((user) => {
        var instruments = user._embedded.instruments
        return instruments
        });

    }catch(error){
        console.log(error)
        return []
    }
}