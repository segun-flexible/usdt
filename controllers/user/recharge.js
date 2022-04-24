const asyncHandler = require("../../helpers/asyncHandler");
const { fetcher } = require("../../helpers/fetcher");
const { openToken } = require("../../helpers/jwt");
const { getWebSettings } = require("../../helpers/settings");


exports.rechargeGet = asyncHandler(async (req, res, next) => {
    

    res.render("user/pages/recharge", {
        title: "Recharge USDT",
    })

});

exports.rechargePost = asyncHandler(async (req, res, next) => {


  const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

  const { website_coinbase_key, website_url } =
    await getWebSettings();

  //Create Charges
  const obj = {
    name: `Recharge USDT Account`,
    description: `Recharge ${req.body.amount} USDT`,
    local_price: {
      amount: parseFloat(req.body.amount),
      currency: "USD"
    },
    pricing_type: "fixed_price",
    metadata: {
      customer_id: id
    },
    redirect_url: `${website_url}/user/history/recharge`,
    cancel_url: `${website_url}/user/recharge`,
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
