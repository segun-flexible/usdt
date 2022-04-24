let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
    
    //Submit Form
    document.querySelectorAll("form#settings").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                website_title: e.currentTarget.querySelector("input#title").value,
                website_description: e.currentTarget.querySelector("textarea#description").value,
    
                website_tagline: e.currentTarget.querySelector("input#tagline").value,
                website_url: e.currentTarget.querySelector("input#url").value,
                website_email: e.currentTarget.querySelector("input#email").value,
                website_coinbase_key: e.currentTarget.querySelector("input#coinbase").value,
                
                website_currency: e.currentTarget.querySelector("input#currency").value,
                website_header_code: e.currentTarget.querySelector("textarea#header").value,
                website_footer_code: e.currentTarget.querySelector("textarea#footer").value,
            };

        
            submit = e.currentTarget.querySelector("button");
            fetchResourse(obj,"/admin/settings/saved","POST","reload")
        })
    })
})