document.addEventListener("DOMContentLoaded", () => {
    let submit,cbText;
    
    try {
        document.querySelector("span.date").textContent = new Date().getFullYear()
    } catch (error) {
        
    }
   
    try {
        document.querySelector("form.referral").addEventListener("submit", e => {
            e.preventDefault()
            e.currentTarget.querySelector("input").select()
            document.execCommand("copy")
        })
    } catch (error) {
        
    }
    

})