
let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //EDIT PACKAGE
    document.querySelectorAll("form#edit").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {

                p_name: e.currentTarget.parentElement.querySelector("input#p_name").value,
                p_price: e.currentTarget.parentElement.querySelector("input#p_price").value,
                p_daily_withdrawal_limit: e.currentTarget.parentElement.querySelector("input#p_daily_withdrawal_limit").value,
                p_total_withdrawal_limit: e.currentTarget.parentElement.querySelector("input#p_total_withdrawal_limit").value
            };
       
            const id = e.currentTarget.parentElement.querySelector("input#id").value;

            submit = e.currentTarget.parentElement.querySelector("button#button");

            fetchResourse(obj,`${window.location.origin + window.location.pathname}?id=${id}`,"PUT","reload")
        });
        
    });

    //CREATE PACKAGE
    document.querySelector("form#new").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            p_name: e.currentTarget.querySelector("input#p_name").value,
            p_price: e.currentTarget.querySelector("input#p_price").value,
            p_daily_withdrawal_limit: e.currentTarget.querySelector("input#p_daily_withdrawal_limit").value,
            p_total_withdrawal_limit: e.currentTarget.querySelector("input#p_total_withdrawal_limit").value
            
        };

        submit = e.currentTarget.querySelector("button#button");
        fetchResourse(obj,`${window.location.origin + window.location.pathname}`,"POST","reload")
    });

    //Delete Package
    window.deletePackage = function (packageId, btn) {
        submit = btn;
        swal({
                title: "Are you sure?",
                text: "You cannot recover this once deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(wilDelete => {
                if (wilDelete) {
                    fetchResourse({},`${window.location.origin + window.location.pathname}?id=${packageId}`,"DELETE","reload")
                }
            })
        
    }

})