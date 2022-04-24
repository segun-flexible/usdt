const db = require("../models/db");

//CREATE USER
exports.createNewUser = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_users SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};


exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE uid = ? LIMIT 1", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//GET USER BY ACCOUNT NO
exports.getUserByAccountNo = (accountNo) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE account_no = ? LIMIT 1", accountNo, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//GET USER BY WALLET ADDRESS
exports.getUserByWalletAddress = (address) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE wallet_address = ? LIMIT 1", address, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//GET USER BY USERNAME
exports.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE username = ? LIMIT 1",username, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//GET USER BY EMAIL
exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE email = ? LIMIT 1",email, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}


//EDIT USER BY ID
exports.editUserById = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_users SET ? WHERE uid = ?", [obj, parseInt(userId)], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//DELETE USER BY ID
exports.deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_users WHERE uid = ?", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};


//UPDATE USER TOTAL BALANCE BY ID
exports.updateUserTotalBalanceById = (userId,amountToCredit) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE f_users SET total_balance = total_balance + ${parseInt(amountToCredit)} WHERE uid = ${parseInt(userId)}`, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//UPDATE USER DEPOSITED BALANCE BY ID
exports.updateUserDepositedBalanceById = (userId,amountToCredit) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE f_users SET deposited_balance = deposited_balance + ${parseInt(amountToCredit)} WHERE uid = ${parseInt(userId)}`, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};


//GET USER LIST
exports.getUsersList = (search,account,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;
        if (search) {
            query = `SELECT * FROM f_users A WHERE (A.firstname LIKE '%${search}%' OR A.lastname LIKE '%${search}%') LIMIT ${limit} OFFSET ${offset}`
        } else if (account) {
            query = `SELECT * FROM f_users WHERE account_no = ${account} LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_users LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
}



//<!------------FOR ADMIN---------------->
//UPDATE USER DEPOSITED BALANCE BY ID
exports.getMembersCount = (type) => {
    return new Promise((resolve, reject) => {
        let query;
        if (type === "active") {
            query = `SELECT COUNT(*) as total FROM f_users WHERE plan_id > 0`;
        }else if (type === "total") {
            query = `SELECT COUNT(*) as total FROM f_users`;
        }
        else {
            query = `SELECT COUNT(*) as total FROM f_users WHERE (plan_id = 0 OR plan_id IS NULL)`
        }
        db.query(query, (err, user) => {
            if (err) reject(err)
            else resolve(user[0].total)
        })
    })
};

//GET TOP COUNTRY
exports.getTopCountry = () => {
    return new Promise((resolve, reject) => {
        db.query(`select country, count(*) as cnt from f_users group by country order by cnt desc`, (err, user) => {
            if (err) reject(err)
            else resolve(user[0] ? user[0].country : 'None')
        })
    })
};