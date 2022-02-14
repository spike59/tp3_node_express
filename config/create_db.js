const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});


    const dbName = "shop_data";
    const sql = `CREATE DATABASE ${dbName} ;`;
    db.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });


db.end(); 