let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#basic-settings").addEventListener("submit", e => {
        e.preventDefault();

        const obj = {
            firstname: e.currentTarget.querySelector("input#firstname").value,
            lastname: e.currentTarget.querySelector("input#lastname").value,
            middlename: e.currentTarget.querySelector("input#middlename").value,
            mothername: e.currentTarget.querySelector("input#mothername").value,
            email: e.currentTarget.querySelector("input#email").value,
            phone_number: e.currentTarget.querySelector("input#phone_number").value,
            occupation: e.currentTarget.querySelector("input#occupation").value,
            address: e.currentTarget.querySelector("input#address").value,
            city: e.currentTarget.querySelector("input#city").value,
            state: e.currentTarget.querySelector("input#state").value,
            zipcode: e.currentTarget.querySelector("input#zipcode").value,
            kin_name: document.querySelector("input#kin_name").value,
            kin_address: document.querySelector("input#kin_address").value,
            kin_phone_number: document.querySelector("input#kin_phone_number").value,
            kin_relation: document.querySelector("input#kin_relation").value
        };
        
        submit = document.querySelector("button#submit");
        fetchResourse(obj,window.location.href,"POST","reload")
    })
})