const logger = require("../helpers/logger");
const db = require("../models/db");


exports.generalData = (app) => {
    
    return (req, res, next) => {
        
        db.query("SELECT * FROM f_website_settings", async (err, datas) => {
        if (err) {
            logger.debug(err)
        } else {
            let data = datas[0];

            req.app.locals.shortUrl = req.originalUrl
            req.app.locals.longUrl = req.protocol + "://" + req.get('host') + req.originalUrl
            
            
            app.locals.websiteDetails = data;
            next()
        }
        })
        
    }
}