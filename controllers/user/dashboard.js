const asyncHandler = require("../../helpers/asyncHandler");
const { openToken } = require("../../helpers/jwt");
const { getUserTransactionHistoryByUserid, getUserRechargeHistoryByUserid, getUserSubHistoryByUserid, getUserWithdrawalHistoryByUserid, adminGetTransactionHistory } = require("../../helpers/history");
const { getDateFormatForPost, extractTime } = require("../../helpers/dateTime");
const { editUserById, getUserById } = require("../../helpers/user");


exports.userDashboardGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    const trans1 = await getUserRechargeHistoryByUserid(id, "", 9999999999, 0);
    const trans2 = await getUserSubHistoryByUserid(id, "", 9999999999, 0);
    const trans3 = await getUserTransactionHistoryByUserid(id, "", 9999999999, 0);
    const trans4 = await getUserWithdrawalHistoryByUserid(id, "", 9999999999, 0);



    const history = await adminGetTransactionHistory(50, 0);
    
    for(i=0; i < history.length; i++){

        history[i].time = extractTime(history[i].issue_at,"hh:mm A");
        history[i].date = getDateFormatForPost(history[i].issue_at)
        history[i].senderDetails = await getUserById(history[i].user_id);

    }
    

    res.render("user/pages/dashboard/dashboard", {
        title: "My Dashboard",
        history,
        totalTrans: trans1.length + trans2.length + trans3.length + trans4.length
    })
})


exports.tradePost = asyncHandler(async (req, res, next) => {


    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
  
    const user = await getUserById(id);

    //Check If Pin Is Valid
    if (req.body.pin !== user.pin) {
        return res.json({status:false,message:"Invalid PIN"})
    }


    if (parseFloat(req.body.amount) < 10) return res.json({status:false,message:`Minimum USDT Amount Must Be Greater Than ${req.body.amount}`})
   
    if (user.balance < parseFloat(req.body.amount)) {
        return res.json({status:false,message:"Insufficient Balance"})
    };

    await editUserById(id,{
        balance: user.balance - parseFloat(req.body.amount)
    });

    res.json({status:true,message:"Trade Started"})
  
    
  });
  