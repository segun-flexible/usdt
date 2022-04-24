
let submit, cbText;


document.addEventListener("DOMContentLoaded",()=>{

    document.querySelector("form#proofform").addEventListener("submit", e =>{
        e.preventDefault();
        
        if(!window.id){
            swal({title:"Select A Subscription Plan",icon:"error"})
        }
        
        const obj = new FormData();
        obj.append("proof", e.currentTarget.querySelector("input#proof").files[0])
        obj.append("id", window.id)
        
        submit = e.currentTarget.querySelector("button");
        fetchResourse(obj, window.location.href, "PUT", "reload", false)
    })
})

window.whichVIP = function(id){
    window.id = id
}

window.autoSubscribe = async function(btn){

    if(!window.id){
        swal({title:"Select A Subscription Plan",icon:"error"})
    }

    submit = btn


    const data = await fetchResourse({id:window.id}, window.location.href, "POST", "nothing", true)
    
    if(!data.status) return
    window.open(data.url,"_blank")
    
    prompt("Copy and Browse this Url to Upgrade Your account",data.url)

}