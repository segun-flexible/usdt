const asyncHandler = require("../../helpers/asyncHandler");
const { fetcher } = require("../../helpers/fetcher");
const { getUserSubHistoryByUserid } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const { getAllPackages, getPackageById } = require("../../helpers/packages");
const { insertIntoProofHistory } = require("../../helpers/proof");
const { getWebSettings } = require("../../helpers/settings");
const { getUserById } = require("../../helpers/user");

exports.userUpgradeGet = asyncHandler(async (req, res, next) => {
    
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    res.render("user/pages/upgrade", {
        title: "Upgrade Account",
        plans: await getAllPackages(),
        history: await getUserSubHistoryByUserid(id,'',99999999,0)
    })
})


exports.userUpgradePost = asyncHandler(async (req, res, next) => {


    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
  
    const { website_coinbase_key, website_url } =
      await getWebSettings();
  
    const plan = await getPackageById(req.body.id);
    if(!plan) return res.json({ status:false,message:"Membership Plan cannot be found"});

    
    const user = await getUserById(id);

    //Check If Is Current Plan
    if(plan.p_id == user.plan_id) return res.json({ status:false,message:"You have already subscribe to this membership plan"});

    //Create Charges
    const obj = {
      name: `${plan.p_name} Membership Plan`,
      description: `Upgrade To ${plan.p_name} With ${plan.p_price.toLocaleString()} USDT`,
      local_price: {
        amount: plan.p_price,
        currency: "USD"
      },
      pricing_type: "fixed_price",
      metadata: {
        customer_id: id,
        plan
      },
      redirect_url: `${website_url}/user/history/subscription`,
      cancel_url: `${website_url}/user/upgrade`,
    };
  
    const headers = {
      "X-CC-Api-Key": website_coinbase_key,
      "X-CC-Version": "2018-03-22",
    };
  
    try {
      const data = await fetcher(
        obj,
        "https://api.commerce.coinbase.com/charges",
        "POST",
        headers
      );
  
      if(data.error) return res.json({ status: false, message: data.error.message });
  
      //Response With Checkout Hosted Url
      return res.json({ status: true, url: data.data.hosted_url });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  
    
  });


//MANUAL PAYMENT
exports.userUpgradePut = asyncHandler(async (req, res, next) => {

  const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

  const plan = await getPackageById(req.body.id);

  if(!plan) return res.json({ status:false,message:"Membership Plan cannot be found"});

  await insertIntoProofHistory({
    pr_user: id,
    pr_planid: req.body.id,
    pr_proof: req.imageName
  });

  return res.json({status:true,message:"Payment Sent",text:"You will be notified once the system confirmed your payment"})
  
});