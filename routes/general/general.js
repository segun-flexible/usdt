
const { homePage } = require("../../controllers/general/home");
const { coinbaseChargeWebHook, subscriptionWebhook } = require("../../controllers/general/webhook");
const { isAuthUser } = require("../../middleware/isAuth");

const generalRoute = require("express").Router();

//HOMEPAGE
generalRoute.route("/").get(isAuthUser, homePage)

//RECHARGE WEBHOOK
generalRoute.route("/webhook/coinbase").get(coinbaseChargeWebHook).post(coinbaseChargeWebHook).put(coinbaseChargeWebHook)

//UPGRADE WEBHOOK
generalRoute.route("/webhook/coinbase/upgrade").get(subscriptionWebhook).post(subscriptionWebhook).put(subscriptionWebhook)


module.exports = generalRoute