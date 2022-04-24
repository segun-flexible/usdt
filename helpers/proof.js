const db = require("../models/db");

//GET ADMIN BY ID
exports.insertIntoProofHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_proof SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//DELETE PROOF BY ID
exports.deleteProofById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_proof WHERE pr_id = ?", parseInt(id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET PROOFS
exports.getProofs = (limit,offset) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT * FROM f_proof JOIN f_users ON uid = pr_user LEFT JOIN f_plans ON p_id = pr_planid LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}