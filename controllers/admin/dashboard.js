const asyncHandler = require("../../helpers/asyncHandler");
const formatNumber = require("../../helpers/formatNumber");
const { getAdminRechargeHistory, getAdminSubHistory, adminGetTransactionHistory, getAdminWithdrawalHistory, getIncomes } = require("../../helpers/history");
const { getMembersCount, getTopCountry } = require("../../helpers/user");


exports.adminDashboardGet = asyncHandler(async (req, res, next) => {

    const members = await getMembersCount("total");
    const activeMembers = await getMembersCount("active");
    const inactiveMembers = await getMembersCount("inactive");


    const trans1 = await getAdminRechargeHistory(99999999999, 0);
    const trans2 = await getAdminSubHistory(9999999999, 0);
    const trans3 = await adminGetTransactionHistory(9999999999, 0);
    const trans4 = await getAdminWithdrawalHistory(9999999999, 0);

    return res.render("admin/pages/dashboard", {
        title: "Welcome Admin",
        members,
        activeMembers,
        inactiveMembers,
        incomes: await getIncomes(),
        cnt: await getTopCountry(),
        totalTrans: trans1.length + trans2.length + trans3.length + trans4.length
    })
})