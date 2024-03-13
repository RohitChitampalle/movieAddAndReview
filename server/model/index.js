const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: "localhost",
    user: "movieAdmin",
    password:"RamRam",
    database: "moviesdb",
    port: 3306,
    multipleStatements: true
});


module.exports = connection

