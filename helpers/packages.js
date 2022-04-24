const db = require("../models/db");

//GET PACKAGE LIST
exports.getPackages = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_plans WHERE plan_status = 1", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//ADMIN GET PACKAGE LIST
exports.getAllPackages = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_plans", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};


exports.createNewPackage = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_plans SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//Update Package
exports.updatePackage = (obj,id) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_plans SET ? WHERE p_id = ?", [obj,parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET PACKAGE BY ID
exports.getPackageById = (packageId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_plans WHERE p_id = ?", parseInt(packageId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};


//Delete Package By Id
exports.deletePackageById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_plans WHERE p_id = ?", parseInt(id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
