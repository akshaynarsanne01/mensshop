const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "mensshop",
    maxAllowedPacket: 64 * 1024 * 1024
});

module.exports = pool;