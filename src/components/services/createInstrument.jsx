export async function createInstrument(instrument,type){

    const requestOptions = {
        method: 'POST',
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


        const body = {
            "name": instrument,
            "type": type
            }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'mode': 'no-cors',
            // 'Authorization': `Bearer ${token}`,
            }
            console.log(body)
        const response = await fetch('https://jamsession-cs467-w2023.uw.r.appspot.com/instruments', {

        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
        });

response.json().then(response => {
    return response.ok;
});
        console.log('created')

    }catch(error){
        
        console.log(error)
        // navigate('./')
        
        
    }

}