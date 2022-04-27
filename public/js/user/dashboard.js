
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
        const trade = await fetchResourse(obj, window.location.href, "POST", "noload");

        if(trade.status){
            localStorage.setItem("trade",true);
            window.location.reload()
        }


        
    })
    

    if(localStorage.getItem("trade")){
        document.querySelector("a#tradeStatus").innerHTML = `<i class="fa fa-spinner rotate" aria-hidden="true"></i> USDT Trade Is Running`
    }
    
})
