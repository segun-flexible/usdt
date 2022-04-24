const fetch = require("node-fetch");

exports.fetcher = (body, url, method,header = {},jsonMode = true) => {
    return new Promise((resolve, reject) => {

        const options = {
            method,
            credentials: "include",
            mode: "cors",
            headers: {
                "content-type": "application/json",
                ...header
            }
        };

        if (jsonMode) {
            
            if (method.toLowerCase() !== "get") options.body = JSON.stringify(body);
            
        } else {
           options.body = body; 
        }

        fetch(url, options)
        .then(res => resolve(res.json()))
        .catch(err => reject(err))
        
    })
}