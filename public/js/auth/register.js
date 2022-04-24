let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
   

    document.querySelector("input#pin").addEventListener("keypress",allowOnlyNumbers)
    document.querySelector("input#pin2").addEventListener("keypress",allowOnlyNumbers)
    document.querySelector("input#phone_number").addEventListener("keypress",allowOnlyNumbers)

    function allowOnlyNumbers(event) {
        if (event.key.length === 1 && /\D/.test(event.key)) {
          event.preventDefault();
        }
      }

    //SUBMIT FORM
    document.querySelector("form#register").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            
            username: e.currentTarget.querySelector("input#username").value,
            email: e.currentTarget.querySelector("input#email").value,
            phone_number: e.currentTarget.querySelector("input#phone_number").value,
            password: e.currentTarget.querySelector("input#password1").value,
            pin: e.currentTarget.querySelector("input#pin").value,
            country: e.currentTarget.querySelector("select#country").value,
            wallet_type: e.currentTarget.querySelector("select#wallet-type").value,
            wallet_address: e.currentTarget.querySelector("input#wallet-address").value,
        };

        const password2 = e.currentTarget.querySelector("input#password2").value;
        const pin2 = e.currentTarget.querySelector("input#pin2").value;

        //Check Password
        if (obj.password !== password2) {
            return swal({
                title: "Password Not Matched",
                icon: "error"
            });
        };

        
        //Check Pin
        if (obj.pin !== pin2) {
            return swal({
                title: "Withdrawal PIN Not Matched",
                icon: "error"
            });
        };
        
        if (obj.pin.length < 4) {
            return swal({
                title: "Withdrawal PIN Must Be 4 Digit Length",
                icon: "error"
            });
        };



        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj,window.location.href,"POST","/login")
    })
})