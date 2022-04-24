const { openToken } = require("../helpers/jwt")
const db = require("../models/db")

let arr = ["Checking Account", "Saving Account", "Fixed Deposit Account"];

exports.userDetails = (app) => {
  
    return async (req, res, next) => {
        if (req.signedCookies[process.env.TOKEN_NAME]) {
        const token = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
        
            if (token.role && token.role === "admin") {
            
            db.query("SELECT * FROM f_admins WHERE uid = ? LIMIT 1", parseInt(token.id), async (err, user) => {
            if (err) {
                return next(err)
            } else {
                let u = user[0];
                
                if (u.role === 1) {
                    u.role = "Admin"
                }
                
                if (!u) {
                    res.clearCookie(process.env.TOKEN_NAME);
                return res.redirect("/admin/login")
                }

                app.locals.account_type = arr
                app.locals.user = u
                next()
            }
        })
        } else {
            
           db.query("SELECT * FROM f_users WHERE uid = ? LIMIT 1", parseInt(token.id), async (err, user) => {
            if (err) {
                return next(err)
            } else {
                let u = user[0];

                if (!u) {
                    res.clearCookie(process.env.TOKEN_NAME);
                return res.redirect("/login")
                }

                u.account_type = arr[u.account_type - 1];
                
                app.locals.user = u
                next()
            }
        }) 
        }
        
        } else {
            app.locals.user = null
            next()
        }
        
        
    }
}

