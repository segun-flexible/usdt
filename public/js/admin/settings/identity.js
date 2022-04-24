//CREATE NEW
let submit, cbText;

 
document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("form").addEventListener("submit", async e => {
            e.preventDefault();
            
        
        const obj = new FormData();
        
        if (e.currentTarget.querySelector("input#logo").files[0]) {
            obj.append("website_logo", e.currentTarget.querySelector("input#logo").files[0]);
        }
        
        if (e.currentTarget.querySelector("input#favicon").files[0]) {
           obj.append("website_favicon", e.currentTarget.querySelector("input#favicon").files[0]) 
        }
        
        
        submit = e.currentTarget.querySelector("button");
        loadingState(submit,true)
        try {
            const logo = await uploadImage(obj, `/admin/settings/saved`, "POST");

            swal({
            title: logo.message,
            icon:"success"
            })

            loadingState(submit, false)
            return
            
        } catch (error) {
           swal({
            title: error.message,
            icon:"error"
           })
            loadingState(submit, false)
            return
        }

        
            
        
        
    })

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", e => {
        
        let file = e.currentTarget.files[0];
        
        document.querySelector(`img#${e.currentTarget.name}`).src = URL.createObjectURL(file)

    })
})
    

    function uploadImage(objFile,url,method ) {
        return new Promise((resolve,reject)=>{
            fetch(url, {
                    method,
                    credentials: "include",
                    mode: "cors",
                    body: objFile,
                })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    }
    

})