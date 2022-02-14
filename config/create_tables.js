const mysql = require('mysql');
const fs = require('fs');


const createSql = fs.readFileSync("./sql/create_database.sql").toString();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop_data",
    multipleStatements:true
});

db.query(createSql,function(error,results,fields){
    if (error){
        throw error;
    }
});

db.end(); 