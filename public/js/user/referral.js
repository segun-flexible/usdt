
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#tipsBtn").click()
    
    
    document.querySelector("form#referral").addEventListener("submit", e => {
        e.preventDefault();
        const input = e.currentTarget.querySelector("input");
        input.select();
        document.execCommand("copy");
        input.blur();

        swal({
            icon: "success",
            title: "Copied",
            message: ''
        })
        
    
    });
    
})
