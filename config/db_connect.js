const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"shop_data"
})

con.connect = (err)=>{
    if (err)throw err;
    console.log("connected");
}