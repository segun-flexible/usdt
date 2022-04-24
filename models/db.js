const mysql = require("mysql");
const logger = require("../helpers/logger");

/*let obj;

if (process.env.NODE_ENV.trim() === "dev") {
    obj = {
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database: 'freeusdt',
        charset: "utf8mb4"
    }
}else{
    obj = {
        connectionLimit : 100,
        host     : 'usdt.mysql.database.azure.com',
        user     : 'usdt',
        password : 'Iamtheowner@',
        database: 'usdt',
        charset: "utf8mb4"
    }
}*/
const db = mysql.createPool({
    connectionLimit : 100,
    host     : 'usdt.mysql.database.azure.com',
    user     : 'usdt',
    password : 'Iamtheowner@',
    database: 'usdt',
    charset: "utf8mb4"
});

db.getConnection((err,data) => {
    if (err) {
        logger.debug(err)
        return console.log(err)
    }
    console.log("DB CONNECTED")
    
    
})

module.exports = db