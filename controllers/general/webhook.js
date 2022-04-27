const asyncHandler = require("../../helpers/asyncHandler");
const { insertIntoRechargeHistory, insertIntoSubHistory } = require("../../helpers/history");
const { getUniqueID } = require("../../helpers/uniqueID");
const { creditReferral } = require("../../helpers/upline");

const { getUserById, editUserById } = require("../../helpers/user");

//COINBASE MERCHANT CHARGE WEBHOOK
exports.coinbaseChargeWebHook = asyncHandler(async (req, res, next) => {
    
    const coinbase = req.body.event
    
    //Other Work To DO
    
    //CONFIRMED
    if(coinbase.type === "charge:confirmed"){

        let total = 0;

        for(i=0; i < coinbase.data.payments.length; i++) total += parseFloat(coinbase.data.payments[i].net.local.amount);

        //Get User
        const user = await getUserById(coinbase.data.metadata.customer_id);


        await editUserById(coinbase.data.metadata.customer_id, {
            balance: user.balance + total
        });

        await insertIntoRechargeHistory({
            ref: "TRX" + getUniqueID(),
            amount: total,
            user_id: coinbase.data.metadata.customer_id
        });

        await creditReferral(coinbase.data.metadata.customer_id, total)


        
    }
    

    //RESOLVED
    if(coinbase.type === "charge:resolved"){

        const user = await getUserById(coinbase.data.metadata.customer_id);

        let total = 0;

            for(i=0; i < coinbase.data.payments.length; i++) total += parseFloat(coinbase.data.payments[i].net.local.amount);

            await editUserById(coinbase.data.metadata.customer_id, {
                balance: user.balance + total
            });

            await insertIntoRechargeHistory({
                ref: "TRX" + getUniqueID(),
                amount: total,
                user_id: coinbase.data.metadata.customer_id
            });
        
            await creditReferral(coinbase.data.metadata.customer_id, total)
        
    }
    
    return res.json({status:true})
    
})












//UPGRADE PLAN SUBSCRIPTION PLAN
exports.subscriptionWebhook = asyncHandler(async (req, res, next) => {
    
    const coinbase = req.body.event
    
    
    //CONFIRMED
    if(coinbase.type === "charge:confirmed"){

        //Change Plan Details To Paid and Its Status
        let total = 0;

        for(i=0; i < coinbase.data.payments.length; i++) total += parseFloat(coinbase.data.payments[i].net.local.amount);

        const plan = JSON.parse(coinbase.data.metadata.plan);

        if(total >= plan.p_price){

            await editUserById(coinbase.data.metadata.customer_id, {
                plan_name: plan.p_name,
                plan_id: plan.p_id,
                p_daily_withdrawal_limit: 0,
                p_total_withdrawal_limit: 0
            });
    
            await insertIntoSubHistory({
                ref: "TRX" + getUniqueID(),
                amount: plan.p_price,
                plan_name: plan.p_name,
                plan_id: plan.p_id,
                user_id: coinbase.data.metadata.customer_id
            });

        }
        


        
    }
    

    //RESOLVED
    if(coinbase.type === "charge:resolved"){

            const plan = JSON.parse(coinbase.data.metadata.plan);

            await editUserById(coinbase.data.metadata.customer_id, {
                plan_name: plan.p_name,
                plan_id: plan.p_id,
                p_daily_withdrawal_limit: 0,
                p_total_withdrawal_limit: 0
            });
    
            await insertIntoSubHistory({
                ref: "TRX" + getUniqueID(),
                amount: plan.p_price,
                plan_name: plan.p_name,
                plan_id: plan.p_id,
                user_id: coinbase.data.metadata.customer_id
            });
        
        
    }
    
    return res.json({status:true})
    
})





