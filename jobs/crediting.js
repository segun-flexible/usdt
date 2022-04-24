const CronJob = require('cron').CronJob;

const logger = require('../helpers/logger');
const db = require("../models/db");

new CronJob('0 0 * * *', async function () {
    
    db.query("UPDATE f_users SET p_daily_withdrawal_limit = 0, p_total_withdrawal_limit = 0",(err,data)=>{
        if(err) logger.debug(err)
        else {}
    })
}, null, true, "Africa/Lagos");

