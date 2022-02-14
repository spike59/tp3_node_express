const mysql = require('mysql');
const fs = require('fs');


const dataSql = fs.readFileSync("./sql/populate_database.sql").toString();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop_data",
    multipleStatements:true
});

db.query(dataSql,function(error,results,fields){
    if (error){
        throw error;
    }
});

db.end(); 