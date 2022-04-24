const asyncHandler = require("../../helpers/asyncHandler");
const { openToken } = require("../../helpers/jwt");
const { getUserTransactionHistoryByUserid, getUserRechargeHistoryByUserid, getUserSubHistoryByUserid, getUserWithdrawalHistoryByUserid, adminGetTransactionHistory } = require("../../helpers/history");
const { getDateFormatForPost, extractTime } = require("../../helpers/dateTime");


exports.userDashboardGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    const trans1 = await getUserRechargeHistoryByUserid(id, "", 9999999999, 0);
    const trans2 = await getUserSubHistoryByUserid(id, "", 9999999999, 0);
    const trans3 = await getUserTransactionHistoryByUserid(id, "", 9999999999, 0);
    const trans4 = await getUserWithdrawalHistoryByUserid(id, "", 9999999999, 0);



    const history = await adminGetTransactionHistory(50, 0);
    
    await history.map(h => {
        h.time = extractTime(h.issue_at,"hh:mm A");
        h.date = getDateFormatForPost(h.issue_at)
    });


    res.render("user/pages/dashboard/dashboard", {
        title: "My Dashboard",
        history,
        totalTrans: trans1.length + trans2.length + trans3.length + trans4.length
    })
})