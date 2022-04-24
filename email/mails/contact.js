const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebsiteSettings } = require("../../helpers/getSomeInfo");

exports.contactUsMailer = async (obj) => {

    //GET Site Email
    const {website_email} = await getWebsiteSettings()
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","contact.ejs"),{obj});

    const mailOptions = {
    from: `${obj.name} <${obj.email}>`,
    to: website_email,
    subject: obj.subject,
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } 
    })

    
}
