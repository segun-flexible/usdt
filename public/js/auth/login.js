let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#step1").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            credentials: e.currentTarget.querySelector("input#credentials").value,
            password: e.currentTarget.querySelector("input#password").value
        };

        submit = e.currentTarget.querySelector("button");

        fetchResourse(obj,window.location.href,"POST",undefined)
        
        
    });

    //Verify Pin

    
})