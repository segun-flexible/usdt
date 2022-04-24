const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");


exports.verifyAccountMailer = async (user) => {

    const { website_email, website_title, website_url } = await getWebSettings()
    
    const url = `${website_url}/verify/${user.token}`;

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","verifyAccount.ejs"),{user,url,website_url,website_title});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: 'Account Verification',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            console.log(result)
        }
    })

    
}
