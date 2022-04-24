
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#tipsBtn").click()
    document.querySelector("input#amount").addEventListener("keyup", e =>{
        document.querySelector("#fees").value = `${window.calculatePercentage(1,parseInt(e.target.value))} USDT`
    })
    
    //SUBMIT FORM
    document.querySelector("form#transfer").addEventListener("submit", e => {
        e.preventDefault()
        const obj = {
            account: document.querySelector("input#account_no").value,
            amount: document.querySelector("input#amount").value,
        }
        

        submit = document.querySelector("button#submit")
        fetchResourse(obj, window.location.href, "POST", undefined)
        
    })
    
    
    window.calculatePercentage = (percentageValue,amountValue) => {
        return (parseFloat(percentageValue) / 100) * amountValue
    }
})
