function fetchResourse(body, url, method,goto,jsonMode = true) {
        
    return new Promise((resolve, reject) => {
        const options = {
            method,
            credentials: "include",
            mode: "cors",
            headers: {
                [jsonMode && "content-type"]: "application/json",
            }
        };

        if (jsonMode) {
            
            if (method.toLowerCase() !== "get") options.body = JSON.stringify(body);
            
        } else {
           options.body = body; 
        }
        

        loadingState(submit,true)
        fetch(url, options)
                    .then(res => res.json())
                    .then(res => {
                        let redirectUrl = res.goto;

                        loadingState(submit,false)
                        if (res.status) {

                            //First Check 
                            if (goto === "nothing") return resolve(res);
                            
                            swal({
                                icon: "success",
                                title: res.message,
                                text: res.text || '',
                                
                            }).then(() => {
                               
                                if (goto === "noload") {
                            return resolve(res)
                                } else if (goto === "reload") {
                                    window.location.reload()
                                }  else {
                                   window.location.href = redirectUrl
                                }
                    })
                        } else {
                            swal({
                                icon: "error",
                                title: res.message,
                                text: res.text || '',
                                
                            }).then(()=> res.goto ? window.location.href = res.goto : resolve(res))
                        }
                    }).catch(err => {
                        loadingState(submit,false)
                    swal({
                                icon: "error",
                                title: "Something Went Wrong",
                                text: err.message || '',
                                
                            }).then(()=> reject(err))
                    })
        
    })
}


function loadingState(element, state) {
        if (state) {
            cbText = element.textContent;
            element.innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
  }