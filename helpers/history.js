const db = require("../models/db");

//TOP INVESTORS
exports.insertIntoTransactionHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_transaction_history SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//INSERT INTO RECHARGE
exports.insertIntoRechargeHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_recharge_history SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//INSERT INTO WITHDRAWAL
exports.insertIntoWithdrawalHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_withdrawal_history SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//INSERT INTO SUBSCRIPTION HISTORY
exports.insertIntoSubHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_sub_history SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};



//GET USER TRANSACTION
exports.getUserTransactionHistoryByUserid = (userId,type,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;
        
        if (type) {
            query = `SELECT * FROM f_transaction_history WHERE user_id = ${parseInt(userId)} AND type = ${parseInt(type)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_transaction_history WHERE user_id = ${parseInt(userId)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER RECHARGE HISTORY
exports.getUserRechargeHistoryByUserid = (userId,type,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;
        
        if (type) {
            query = `SELECT * FROM f_recharge_history WHERE user_id = ${parseInt(userId)} AND type = ${parseInt(type)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_recharge_history WHERE user_id = ${parseInt(userId)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER WITHDRAWAL HISTORY
exports.getUserWithdrawalHistoryByUserid = (userId,type,limit,offset) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT * FROM f_withdrawal_history WHERE user_id = ${parseInt(userId)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER SUBSCRIPTION HISTORY
exports.getUserSubHistoryByUserid = (userId,type,limit,offset) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT * FROM f_sub_history WHERE user_id = ${parseInt(userId)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}




//GET USER TRANSACTION
exports.adminGetTransactionHistory = (limit,offset) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM f_transaction_history JOIN f_users ON uid = user_id ORDER BY amount DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER TRANSACTION
exports.adminGetWithdrawalHistory2 = (limit,offset) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM f_withdrawal_history JOIN f_users ON uid = user_id ORDER BY amount DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//ADMIN GET USER RECHARGE HISTORY
exports.getAdminRechargeHistory = (limit,offset) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM f_recharge_history JOIN f_users ON uid = user_id ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//ADMIN GET USER WITHDRAWAL HISTORY
exports.getAdminWithdrawalHistory = (limit,offset) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT * FROM f_withdrawal_history JOIN f_users ON uid = user_id ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}



//ADMIN GET USER SUBSCRIPTION HISTORY
exports.getAdminSubHistory = (limit,offset) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT * FROM f_sub_history JOIN f_users ON uid = user_id ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//ADMIN GET INCOME
exports.getIncomes = () => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT SUM(amount) AS total FROM f_sub_history`, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
}


//GET USER REFERRAL HISTORY
exports.getUserReferralHistory = (status,userId,limit,offset,order) => {
    return new Promise((resolve, reject) => {
        let query;

        if (status) {
            query = `SELECT * FROM f_referrals A JOIN f_users B ON A.r2_id = B.uid WHERE A.r1_id = ${parseInt(userId)} AND status = ${parseInt(status)} ORDER BY r_id ${order ? order : 'DESC' } LIMIT ${limit} OFFSET ${offset}`;
        } else {
            query = `SELECT * FROM f_referrals A JOIN f_users B ON A.r2_id = B.uid WHERE A.r1_id = ${parseInt(userId)} ORDER BY r_id ${order ? order : 'DESC' } LIMIT ${limit} OFFSET ${offset}`;
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else return resolve(data)
        })
        
        
    })
}