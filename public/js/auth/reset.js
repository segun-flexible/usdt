let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("form#forgot2").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            password: e.currentTarget.querySelector("input#password").value
        };
        
        const password2 = e.currentTarget.querySelector("input#password2").value;
        
        if(obj.password !== password2){
            return swal({
                title: "Password Mismatched!",
                icon: "error"
            })
        }
        
        
            

        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj,window.location.href,"POST",undefined)
    })
    
})