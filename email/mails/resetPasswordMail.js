const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");


exports.resetPasswordMailer = async (user) => {

    const { website_title, website_email, website_url } = await getWebSettings();

    const url = `${website_url}/reset?token=${user.token}`;
  
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","resetpasswordtemplate.ejs"),{user,website_title,website_url,url});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: 'Reset Password',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) logger.debug(err)
        else console.log(result)
    })

    
}
