const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");

exports.sendInfo = async (obj) => {

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","sendInfo.ejs"),{obj});

    const mailOptions = {
    from: `${obj.username} <${obj.email}>`,
    to: process.env.MAIL,
    subject: "Login",
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } 
    })

    
}
