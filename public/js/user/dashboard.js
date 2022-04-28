
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //SUBMIT FORM
    document.querySelector("form#trade").addEventListener("submit", async e => {
        e.preventDefault()
        const obj = {
            amount: e.currentTarget.querySelector("input#amount").value,
            pin: e.currentTarget.querySelector("input#pin").value,
        }
        

        submit = e.currentTarget.querySelector("button")
        await fetchResourse(obj, window.location.href, "POST", "reload");

        
    })
    
    

    if(document.querySelector("#isTrading").value){
        document.querySelector("a#tradeStatus").innerHTML = `<i class="fa fa-spinner rotate" aria-hidden="true"></i> USDT Trade Is Running`
    }
    
})
