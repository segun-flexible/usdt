
let submit, cbText;

document.addEventListener("DOMContentLoaded", async () => {

    
    //SUBMIT FORM
    document.querySelector("form#recharge").addEventListener("submit", async e => {
        e.preventDefault()
        const obj = {
            amount: document.querySelector("input#amount").value,
        }
        

        
        submit = document.querySelector("button#submit")
        const data = await fetchResourse(obj, window.location.href, "POST", "nothing", true)
        
        if(!data.status) return
        window.open(data.url,"_blank")
        
        prompt("Copy and Browse this Url to Recharge Your account",data.url)
        
        
    })
})
