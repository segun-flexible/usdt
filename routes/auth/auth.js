const { adminLoginGet, adminLoginPost } = require("../../controllers/auth/admin/adminAuth");
const { userRegisterGet, userRegisterPost, userLoginGet, userLoginPost } = require("../../controllers/auth/auth");
const { userForgotPasswordGet, userForgotPasswordPost, resetPasswordGet, resetPasswordPost } = require("../../controllers/auth/forgot");

const { logoutGet } = require("../../controllers/general/logout");
const { isAuthUser, isUserLogin } = require("../../middleware/isAuth");

const authRoute = require("express").Router();

//REGISTER
authRoute.route("/register").get(isAuthUser, userRegisterGet).post(isAuthUser, userRegisterPost)

//LOGIN
authRoute.route("/login").get(isAuthUser, userLoginGet).post(isAuthUser, userLoginPost)

//RESET PASSWORD
authRoute.route("/forgot-password").get(isAuthUser, userForgotPasswordGet).post(isAuthUser, userForgotPasswordPost)

//RESET PASSWORD
authRoute.route("/reset").get(isAuthUser, resetPasswordGet).post(isAuthUser, resetPasswordPost)

//<!------ADMIN--------->

//ADMIN LOGIN
authRoute.route("/admin/login").get(isAuthUser, adminLoginGet).post(isAuthUser, adminLoginPost);


//LOGOUT
authRoute.route("/logout").get(isUserLogin, logoutGet);



module.exports = authRoute

