'https://jamsession-cs467-w2023.uw.r.appspot.com/users/{user_id}/instruments'

export async function addInstrumentsForThisUserQ(user_id,inst_link){

    console.log("uri-list",inst_link)
    inst_link = inst_link.toString()
    console.log(inst_link)
    inst_link = inst_link.replace(/,/g, '\n')
    // console.log('LINK: ','https://jamsession-cs467-w2023.uw.r.appspot.com/users/'+user_id+'/instruments')
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'text/uri-list', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
        body:[inst_link]
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
        
        var base_url =  'https://jamsession-cs467-w2023.uw.r.appspot.com/users/'+user_id+'/instruments'
        return await fetch(base_url, requestOptions)


    }catch(error){
        console.log(error)
        return false
    }
}