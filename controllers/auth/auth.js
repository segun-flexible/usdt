const asyncHandler = require("../../helpers/asyncHandler");
const { getDataFromObject } = require("../../helpers/dataManipulator");
const { hashPassword, comparePassword } = require("../../helpers/password");

const { getUserById, getUserByUsername, getUserByEmail, createNewUser, getUserByAccountNo } = require("../../helpers/user");
const validator = require("validator");
const { signToken } = require("../../helpers/jwt");
const { getRandomNumber } = require("../../helpers/uniqueID");
const { welcomeMailer } = require("../../email/mails/welcomeMail");
const { countries } = require("../../extras/country");


//REGISTER (GET)
exports.userRegisterGet = asyncHandler(async (req, res, next) => {
    
    res.render("auth/register", {
        title: "Register",
        countries
    })
})

//REGISTER (POST)
exports.userRegisterPost = asyncHandler(async (req, res, next) => {
    //First Get Preferred Obj
    const obj = getDataFromObject(req.body, ["username","email", "password", "phone_number","pin","country","wallet_type","wallet_address"]);
    
    //Hash Password
    obj.password = await hashPassword(obj.password);
    
    //Setting Of Account Number (10 In Length)
    obj.account_no = getRandomNumber(10)
   
    
    //CREATE A USER
    let insertId;

    try {
        const result = await createNewUser(obj);
        insertId = result.insertId;

    } catch (error) {
        let message;
        if (error.sqlMessage.includes("phone")) {
            message = "Phone Number Already Taken"
        } else if (error.sqlMessage.includes("email")) {
            message = "Email Already Taken"
        }

        return res.json({status:false,message})
    }


    //Response To User
    res.json({status:true,message:"Registration Successful",goto:"/login"})

    //Send Welcome Mail
    //const userObj = await getUserById(insertId);
    //userObj.year = new Date().getFullYear()
    //welcomeMailer(userObj)

})


//LOGIN (GET)
exports.userLoginGet = asyncHandler(async (req, res, next) => {
    
    return res.render("auth/login", {
        title: "Login"
    })
});

//LOGIN (POST)
exports.userLoginPost = asyncHandler(async (req, res, next) => {
    
    const isEmail = validator.isEmail(req.body.credentials);
    
    //USER VARIABLE
    let user;

    if (isEmail) {
       user = await getUserByEmail(req.body.credentials)
    } else {
        user = await getUserByUsername(req.body.credentials)
    };

    if (!user) {
        return res.json({status:false,message:"Account not found"})
    };

    //Checking Password
    const isPasswordSame = await comparePassword(req.body.password, user.password);
    
    if (!isPasswordSame) {
        return res.json({status:false,message:"Incorrect Password"})
    }

    
    //All Info Successfully
    //Sign Him A Token And Respond
    const token = await signToken({ id:user.uid });
    res.cookie(process.env.TOKEN_NAME, token, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

    //Checking Where To Send Him To
    return res.json({ status: true, message: `Welcome ${user.username}`, goto: "/user/dashboard" })
    


})




