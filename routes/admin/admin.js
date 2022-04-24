
const { adminDashboardGet } = require("../../controllers/admin/dashboard");

const { isAdmin, isUserLogin } = require("../../middleware/isAuth");
const { identityMulter } = require("../../multer/multerMiddleware");

const { adminUsersListGet, adminUserPut, adminUserDelete } = require("../../controllers/admin/members");
const { adminWebSettingsGet, adminIdentitySettingsGet, adminSettingsPost } = require("../../controllers/admin/settings/webSettings");
const { adminPackageListGet, adminPackageListPost, adminPackageListPut, adminPackageListDelete } = require("../../controllers/admin/plans");
const { adminTransactionHistoryGet } = require("../../controllers/admin/history/transaction");
const { adminRechargeHistoryGet } = require("../../controllers/admin/history/recharge");
const { adminWithdrawalHistoryGet } = require("../../controllers/admin/history/withdrawal");
const { adminUpgradeHistoryGet } = require("../../controllers/admin/history/upgrade");
const { adminProofGet, adminProofPut, adminProofDelete } = require("../../controllers/admin/proof");

const adminRoute = require("express").Router();

//ADMIN DASHBOARD
adminRoute.route("/dashboard").get(isUserLogin, isAdmin, adminDashboardGet);

//<!---------------------USER------------------------>
//ADMIN USERS LIST (APPROVED,DELETE)
adminRoute.route("/users").get(isUserLogin, isAdmin, adminUsersListGet).put(isUserLogin, isAdmin, adminUserPut).delete(isUserLogin, isAdmin, adminUserDelete);

//<!---------------------SETTINGS------------------------>
//ADMIN WEB SETTINGS
adminRoute.route("/settings/websettings").get(isUserLogin, isAdmin, adminWebSettingsGet);

//ADMIN IDENTITY SETTINGS
adminRoute.route("/settings/identity").get(isAdmin, adminIdentitySettingsGet);

//ADMIN SAVE SETTINGS (GENERAL)
adminRoute.route("/settings/saved").post(isAdmin, identityMulter.any(),  adminSettingsPost)


//<!---------------------PACKAGE------------------------>
//PACKAGE
adminRoute.route("/plans").get(isUserLogin, isAdmin, adminPackageListGet).post(isUserLogin, isAdmin, adminPackageListPost).put(isUserLogin, isAdmin, adminPackageListPut).delete(isUserLogin, isAdmin, adminPackageListDelete)

//<!---------------------HISTORY------------------------>
//TRANSACTIONS HISTORY
adminRoute.route("/history/transactions").get(isUserLogin, isAdmin, adminTransactionHistoryGet)

//RECHARGE HISTORY
adminRoute.route("/history/recharge").get(isUserLogin, isAdmin, adminRechargeHistoryGet)

//WITHDRAWAL HISTORY
adminRoute.route("/history/withdrawal").get(isUserLogin, isAdmin, adminWithdrawalHistoryGet)

//UPGRADE HISTORY
adminRoute.route("/history/upgrade").get(isUserLogin, isAdmin, adminUpgradeHistoryGet)

//PROOF
adminRoute.route("/proof").get(isUserLogin, isAdmin, adminProofGet).put(isUserLogin, isAdmin, adminProofPut).delete(isUserLogin, isAdmin, adminProofDelete)



module.exports = adminRoute