const asyncHandler = require("../../helpers/asyncHandler");
const { insertIntoWithdrawalHistory } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const { getPackageById } = require("../../helpers/packages");
const { getUniqueID } = require("../../helpers/uniqueID");
const { getUserById, editUserById } = require("../../helpers/user");



exports.withdrawGet = asyncHandler(async (req, res, next) => {
    

    res.render("user/pages/withdraw", {
        title: "Withdraw USDT",
    })

});

exports.withdrawPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    
    const user = await getUserById(id);

    //Check If Pin Is Valid
    if (req.body.pin !== user.pin) {
        return res.json({status:false,message:"Invalid Withdrawal PIN"})
    }


    if (parseFloat(req.body.amount) <= 0) return res.json({status:false,message:`USDT Amount Must Be Greater Than ${req.body.amount}`})
   
    if (user.balance < parseFloat(req.body.amount)) {
        return res.json({status:false,message:"Insufficient Balance"})
    };

    //Check Sender Plan, And If Can Send The Money
    if(!user.plan_id) return res.json({status:false,message:"Please upgrade your account",text:"Your Account Cannot Withdraw USDT until account is upgraded"});

    //Check The Withdrawal Limit
    const plan = await getPackageById(user.plan_id);
    if(!plan) return res.json({status:false,message:"Membership Plan Not Found"})

    //Check Daily Limit
    if((user.p_daily_withdrawal_limit + parseFloat(req.body.amount)) > plan.p_daily_withdrawal_limit) return res.json({status:false,message:"Daily Withdrawal Limit Exceed",text:"Upgrade to next VIP membership plan"})
    

    //Check Overall Limit
    if((user.p_total_withdrawal_limit + parseFloat(req.body.amount)) > plan.p_total_withdrawal_limit) return res.json({status:false,message:"Total Withdrawal Limit Exceed",text:`please upgrade to the next membership plan`})

    //Deduct The Sender
    await editUserById(id, {
        balance: user.balance - parseFloat(req.body.amount),
        p_total_withdrawal_limit: user.p_total_withdrawal_limit + parseFloat(req.body.amount),
        p_daily_withdrawal_limit: user.p_daily_withdrawal_limit + parseFloat(req.body.amount)
    });
    

    const charges = ((parseFloat(1) / 100) * parseFloat(req.body.amount));


    await insertIntoWithdrawalHistory({
        user_id: id,
        reciever_wallet: req.body.account,
        amount: req.body.amount,
        charges,
        ref: "TRX" + getUniqueID()
    });

    res.json({status:true,message:"USDT Withdrawn",goto:"/user/history/withdraw"})

});
