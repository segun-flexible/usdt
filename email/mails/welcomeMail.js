const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");

exports.welcomeMailer = async (user) => {

    const { website_email, website_title, website_url } = await getWebSettings()
    
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","welcomemailtemplate.ejs"),{user,website_title,website_url});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: 'Account Created Successfully',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } 
    })

    
}
