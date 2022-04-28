const db = require("../models/db");
const { calculatePercentage } = require("./calculation");
const { getWebSettings } = require("./settings");
const { editUserById } = require("./user");

//CREATE NEW UPLINE
exports.createNewUpline = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_referrals SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

exports.editReferralDetails = (r1_id,r2_id,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_referrals SET ? WHERE r1_id = ? AND r2_id = ? AND r_status = 0", [obj, parseInt(r1_id),parseInt(r2_id)],(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET THE REFERRER OF THIS USERID
exports.getReferrerOfThisUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_referrals JOIN f_users ON uid = r1_id WHERE r2_id = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};

//GET ALL REFERREES OF THIS USERID
exports.getReferreesOfThisUserById = (userId, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_referrals A JOIN f_users B ON A.r2_id = B.uid AND A.r1_id = ? LIMIT ? OFFSET ?", [parseInt(userId), limit, offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

exports.creditReferral = async (user_id, amount) => {
    return new Promise( async (resolve, reject) => {

        const userToCredit = await this.getReferrerOfThisUserById(user_id);
        
        
        if(!userToCredit) return resolve(true);

        const {website_referral_percentage} = await getWebSettings();

        const amountToCredit = calculatePercentage(website_referral_percentage, amount);

        await editUserById(userToCredit.uid,{
            balance: userToCredit.balance + amountToCredit
        })

        await this.editReferralDetails(userToCredit.uid, user_id, {
            r_status: 1,
            r_amount: amountToCredit
        })

        return resolve(true);
    })
};