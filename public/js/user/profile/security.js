let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#password").addEventListener("submit", e => {
        e.preventDefault();

        const obj = {
            oldPassword: e.currentTarget.querySelector("input#old-password").value,
            password: e.currentTarget.querySelector("input#password1").value,
            pin: e.currentTarget.querySelector("input#pin").value
        };
    

        
        const password2 = e.currentTarget.querySelector("input#password2").value

      
        //Check If Password Are Correct
        if (obj.password !== password2) {
            swal({
                title: "New Password Mismatched",
                icon: "error"
            });

            return
        };


        
        submit = document.querySelector("button");
        fetchResourse(obj, window.location.href, "POST", "reload")
    });


})



