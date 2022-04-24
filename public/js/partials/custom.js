document.addEventListener("DOMContentLoaded", () => {
    //Date
    document.querySelector("span.date").textContent = new Date().getFullYear();

    //Scroll To Top
    document.querySelector(".scroll-to-top").addEventListener("click", e => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })
})