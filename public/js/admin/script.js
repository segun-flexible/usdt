document.addEventListener("DOMContentLoaded", () => {

    let submit,cbText;
    try {
        document.querySelector("button.navbar-toggler.sidemenu").addEventListener("click", e=>{
document.querySelector(".nav-left-sidebar").classList.toggle("sidemenu-height")
})
    } catch (error) {
        console.log(error)
    };
    

    document.querySelector("span.date").textContent = new Date().getFullYear()
 })