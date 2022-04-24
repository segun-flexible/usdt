
const { userDashboardGet } = require("../../controllers/user/dashboard");
const { userTransactionHistoryGet } = require("../../controllers/user/history/transactionHistory");
const { userRechargeHistoryGet } = require("../../controllers/user/history/rechargeHistory");
const { rechargeGet, rechargePost } = require("../../controllers/user/recharge");
const { userProfileGet, userProfilePut, userSecurityGet, userSecurityPost } = require("../../controllers/user/settings");

const { transferGet, transferPost } = require("../../controllers/user/transfer");
const { isUserLogin, denyAdmin } = require("../../middleware/isAuth");
const { withdrawGet, withdrawPost } = require("../../controllers/user/withdrawal");
const { userWithdrawalHistoryGet } = require("../../controllers/user/history/withdrawalHistory");
const { userUpgradeGet, userUpgradePost, userUpgradePut } = require("../../controllers/user/upgrade");
const { userSubHistoryGet } = require("../../controllers/user/history/subHistory");
const { paymentProofMulter } = require("../../multer/multerMiddleware");


const userRoute = require("express").Router();

//<!-----------------DASHBOARD------------------>
//DASHBOARD
userRoute.route("/dashboard").get(isUserLogin, denyAdmin, userDashboardGet)

//<!-----------------TRANSFER------------------>
//TRANSFER
userRoute.route("/transfer").get(isUserLogin, denyAdmin, transferGet).post(isUserLogin, denyAdmin, transferPost)

//<!-----------------WITHDRAW------------------>
//WITHDRAW
userRoute.route("/withdraw").get(isUserLogin, denyAdmin, withdrawGet).post(isUserLogin, denyAdmin, withdrawPost)

//<!-----------------RECHARGE------------------>
//RECHARGE
userRoute.route("/recharge").get(isUserLogin, denyAdmin, rechargeGet).post(isUserLogin, denyAdmin, rechargePost)

//<!-----------------UPGRADE------------------>
//UPGRADE
userRoute.route("/upgrade").get(isUserLogin, denyAdmin, userUpgradeGet).post(isUserLogin, denyAdmin, userUpgradePost).put(isUserLogin, denyAdmin, paymentProofMulter.single("proof"), userUpgradePut)


//<!-----------------HISTORY------------------>
//HISTORY
userRoute.route("/history/transaction").get(isUserLogin, denyAdmin, userTransactionHistoryGet)

//TRANSFER HISTORY
userRoute.route("/history/recharge").get(isUserLogin, denyAdmin, userRechargeHistoryGet)

//WITHDRAWAL HISTORY
userRoute.route("/history/withdraw").get(isUserLogin, denyAdmin, userWithdrawalHistoryGet)

//SUBSCRIPTION HISTORY
userRoute.route("/history/subscription").get(isUserLogin, denyAdmin, userSubHistoryGet)

//<!-----------------SETTINGS------------------>
//PROFILE
userRoute.route("/settings/profile").get(isUserLogin, denyAdmin, userProfileGet).post(isUserLogin, denyAdmin, userProfilePut)

//SECURITY
userRoute.route("/settings/security").get(isUserLogin, denyAdmin, userSecurityGet).post(isUserLogin, denyAdmin, userSecurityPost)


module.exports = userRoute