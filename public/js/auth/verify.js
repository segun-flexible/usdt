let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    //SUBMIT FORM
    document.querySelector("form#resend").addEventListener("submit", e => {
        e.preventDefault();

        submit = e.currentTarget.querySelector("button");
        fetchResourse(undefined,"/verification","GET","noload")
    })
})