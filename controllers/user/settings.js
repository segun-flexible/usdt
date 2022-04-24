const asyncHandler = require("../../helpers/asyncHandler");
const { getDataFromObject } = require("../../helpers/dataManipulator");
const { openToken } = require("../../helpers/jwt");
const { hashPassword, comparePassword } = require("../../helpers/password");
const { editUserById, getUserById } = require("../../helpers/user");
const fs = require("fs");

exports.userProfileGet = asyncHandler(async (req, res, next) => {
    
    res.render("user/pages/settings/profileSettings", {
        title: "Edit Profile"
    });
    
})

//
exports.userProfilePut = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME])


    
    
    try {
        
        await editUserById(id,req.body)
   

    } catch (error) {
        let message;
        if (error.sqlMessage.includes("phone")) {
            message = "Phone Number Already Taken"
        } else if (error.sqlMessage.includes("email")) {
            message = "Email Already Taken"
        }else if (error.sqlMessage.includes("username")) {
            message = "Username Already Taken"
        };

        return res.json({status:false,message})
    }

    

    return res.json({status:true,message:"Changes Saved"})
})


exports.userSecurityGet = asyncHandler(async (req, res, next) => {
    
    res.render("user/pages/settings/security", {
        title: "Security & Password"
    });
    
})

exports.userSecurityPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //FOR PASSWORD
    if (req.body.password) {
        
        const { password } = await getUserById(id);

    //Compare Old Password
    const isSame = await comparePassword(req.body.oldPassword, password);
    if (!isSame) {
        return res.json({status:false,message:"Incorrect Old Password"})
    }

        req.body.password = await hashPassword(req.body.password);
        //Save Password
        await editUserById(id, { password: req.body.password });

        //Response To User
        return res.json({ status: true, message: "Password Changed" })
        
    }
    
    //FOR PIN
    else if (req.body.pin) {
        
        //Save PIN
        await editUserById(id, { pin: req.body.pin });

        //Response To User
        return res.json({ status: true, message: "PIN Changed" })
        
    }

    

    
})
