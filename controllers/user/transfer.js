const asyncHandler = require("../../helpers/asyncHandler");
const { insertIntoTransactionHistory } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const { getUniqueID } = require("../../helpers/uniqueID");
const { getUserById, editUserById, getUserByAccountNo, getUserByUsername } = require("../../helpers/user");



exports.transferGet = asyncHandler(async (req, res, next) => {
    

    res.render("user/pages/transfer/transfer", {
        title: "Transfer USDT",
    })

});

exports.transferPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    
    const user = await getUserById(id);


    if (parseFloat(req.body.amount) <= 0) return res.json({status:false,message:`USDT Amount Must Be Greater Than ${req.body.amount}`})
   
    if (user.balance < parseFloat(req.body.amount)) {
        return res.json({status:false,message:"Insufficient Balance"})
    };

    //Check The Recipient
    const reciever = await getUserByUsername(req.body.account);
    
    if(!reciever) return res.json({status:false,message:"Third Party's Account Not Found"});


    //Check If User Is Sending To Himself
    if(user.username == reciever.username) return res.json({status:false,message:"You cannot transfer to yourself"});

    //Check Plan, And If Can Accept The Money
    if(!reciever.plan_id) return res.json({status:false,message:"Please notify the Receiver to upgrade account",text:"Third Party's Account Cannot Receive USDT until account is upgraded"});

    //Deduct The Sender
    await editUserById(id, {
        balance: user.balance - parseFloat(req.body.amount)
    });
    

    const charges = ((parseFloat(1) / 100) * parseFloat(req.body.amount));

    //Credit The Reciever
    await editUserById(reciever.uid, {
        balance: reciever.balance + (parseFloat(req.body.amount) - charges)
    });

    await insertIntoTransactionHistory({
        user_id: id,
        reciever_id: reciever.uid,
        reciever_acct: req.body.account,
        amount: req.body.amount,
        charges,
        ref: "TRX" + getUniqueID(),
        type: 'Transfer'
    });

    res.json({status:true,message:"USDT Sent",goto:"/user/history/transaction"})

});

//VERIFY PIN
exports.transferVerifyPinPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const { pin } = await getUserById(id);
   
    //Check If Pin Is Valid
    if (req.body.pin !== pin) {
        return res.json({status:false,message:"Invalid Account PIN"})
    }

    return res.json({status:true})

});

