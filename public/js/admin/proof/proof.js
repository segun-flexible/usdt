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
    //Mark Request
    document.querySelector('a#approved-marked').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.id,
                    planId: m.dataset.plan_id,
                    planName: m.dataset.plan_name,
                    planPrice: m.dataset.plan_price,
                    userId: m.dataset.user_id,
                    proof: m.dataset.proof,
                });
            }
        });

        
        submit = document.querySelector("a#approved-marked")
        fetchResourse(obj,window.location.href,"PUT","reload") 

    })
        
    //DELETE Request
    document.querySelector('a#delete-all').addEventListener("click", e => {
        let obj = {
            type: "mark_all",
            data: []

        };
        document.querySelectorAll("input#mark").forEach(m => {
            if (m.parentNode.firstElementChild.checked) {
                
                obj.data.push({
                    id: m.dataset.id,
                    proof: m.dataset.proof
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
                    fetchResourse(obj,window.location.href,"DELETE","reload") 
                }
            })
        
        

    })
        
    } catch (error) {
        
    };


    try {
        document.querySelectorAll("#approveProof").forEach(btn => {
            btn.addEventListener("click", e => {
                swal({
                    title: "Are you sure?",
                    text: "You cannot recover this once approved!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then(approved => {
                    if (approved) {
                        
                        const obj = {
                            id: btn.dataset.id,
                            planId: btn.dataset.plan_id,
                            planName: btn.dataset.plan_name,
                            planPrice: btn.dataset.plan_price,
                            userId: btn.dataset.user_id,
                            proof: btn.dataset.proof,
                        };

        
                        submit = btn
                        fetchResourse(obj,window.location.href,"PUT","reload")

                    }
                })

                
            })
        })
    } catch (error) {
        
    }


    try {
        


        //DELETE ONE BY ONE
        document.querySelectorAll("a#delete-one").forEach(btn => {
            btn.addEventListener("click", e => {
            
                const obj = {
                    type: "one",
                    id: e.currentTarget.dataset.id,
                    proof: btn.dataset.proof,
                };

                submit = e.currentTarget;

                swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse(obj,window.location.href,"DELETE","reload") 
                }
            })
                
            })
        })

    } catch (error) {
        console.log(error)
    }
})