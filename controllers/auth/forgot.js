const asyncHandler = require("../../helpers/asyncHandler")
const validator = require("validator");
const { getUserByUsername, getUserByEmail, editUserById, getUserByAccountNo } = require("../../helpers/user");

const { resetPasswordMailer } = require("../../email/mails/resetPasswordMail");
const { signResetPasswordToken, openToken } = require("../../helpers/jwt");
const { hashPassword } = require("../../helpers/password");

//FORGOT PASSWORD (GET)
exports.userForgotPasswordGet = asyncHandler(async (req, res, next) => {
    
    return res.render("auth/forgot-password/forgot", {
        title: "Reset Password"
    });
    
})


//FORGOT PASSWORD (POST)
exports.userForgotPasswordPost = asyncHandler(async (req, res, next) => {
    
   
    //USER VARIABLE
    let user = await getUserByEmail(req.body.credentials)

    if (!user) {
        return res.json({status:false,message:"Account not found"})
    };

    const token = await signResetPasswordToken({ id: user.uid},"10m");

    user.token = token;
    user.year = new Date().getFullYear()
    user.date = new Date().toDateString() + " " + new Date().toTimeString();

    res.json({ status: true, message: `E-mail has been sent to ${user.email} successfully`});

    //Send Mail
    resetPasswordMailer(user);
})

//RESET PASSWORD (GET)
exports.resetPasswordGet = asyncHandler(async (req, res, next) => {
    
    try {
        
        const token = await openToken(req.query.token);
        
        return res.render("auth/forgot-password/step2", {
            title: "Change Your Password",
            token
        })
        
    } catch (error) {
        return res.render("error/error", {
            title: "Something Went Wrong",
            text:error.message
        })
    }
})

//RESET PASSWORD (POST)
exports.resetPasswordPost = asyncHandler(async (req, res, next) => {
    
    try {
    
        const token = await openToken(req.query.token);
        
        await editUserById(token.id, {
            password: await hashPassword(req.body.password)
        });

        return res.json({status:true,message:"Password Reset Successfully",goto:"/login"})
        
    } catch (error) {
        return res.json({status:false,message:error.message})
    }
})