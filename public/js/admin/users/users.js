let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    try {
        //Mark One Mark All
    document.querySelector("input#mark-head").addEventListener("change", e => {
        document.querySelectorAll("input#mark").forEach(m => {
            m.checked = e.currentTarget.checked
        })
    });
    } catch (error) {
        console.log(error)
    }


    try {
   
    //DELETE Request
    document.querySelector('a#delete-all').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.id
                });
            }
        });

        
        submit = document.querySelector("a#delete-all")
        swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse(obj,"/admin/users","DELETE","reload") 
                }
            })
        
        

    })
        
    } catch (error) {
        
    };


    try {
        document.querySelectorAll("form#edit-user").forEach(form => {
            form.addEventListener("submit", e => {
                e.preventDefault();
                const obj = {
                    
                    account_no: e.currentTarget.parentElement.querySelector("input#account_no").value,
                    email: e.currentTarget.parentElement.querySelector("input#email").value,
                    pin: e.currentTarget.parentElement.querySelector("input#pin").value,
                    phone_number: e.currentTarget.parentElement.querySelector("input#phone_number").value,
                    country: e.currentTarget.parentElement.querySelector("select#country").value,
                    balance: e.currentTarget.parentElement.querySelector("input#balance").value
                    
                };
                
                const id = e.currentTarget.parentElement.querySelector("input#id").value

                submit = e.currentTarget.parentElement.querySelector("button")
                fetchResourse(obj,`/admin/users?id=${id}`,"PUT","reload")
            })
        })


        //DELETE ONE BY ONE
        document.querySelectorAll("a#delete-one").forEach(btn => {
            btn.addEventListener("click", e => {
            
               const id = e.currentTarget.dataset.id
                submit = e.currentTarget;

                swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse({},`/admin/users?id=${id}`,"DELETE","reload") 
                }
            })
                
            })
        })

    } catch (error) {
        console.log(error)
    }


    //CREDIT USER
    try {
        
        document.querySelectorAll("form#credit-user").forEach(form => {
            form.addEventListener("submit", e => {
                e.preventDefault();
                const obj = {
                    amount: e.currentTarget.parentElement.querySelector("input#amount").value,
                    id: e.currentTarget.parentElement.querySelector("input#id").value
                };
                

                submit = e.currentTarget.parentElement.querySelector("button")
                fetchResourse(obj,`/admin/users/credit`,"POST","reload")
            })
        })

    } catch (error) {
        
    }

    try {
        document.querySelector("form#account_no").addEventListener("submit", e => {
            e.preventDefault()
            const account = e.currentTarget.querySelector("input").value;

            if (!account) {
                return
            }

            window.location.href = `/admin/users?account=${account}`
        });

        //Search Member
        document.querySelector("form.search-member").addEventListener("submit", e => {
            e.preventDefault();
            const search = e.currentTarget.querySelector("input").value;

            if (!search) {
                return
            }

            window.location.href = `/admin/users?search=${search}`
        });

        document.querySelector("a.reset").addEventListener("click", e => {
            window.location.href = `/admin/users`
        })
    } catch (error) {
        
    }
})