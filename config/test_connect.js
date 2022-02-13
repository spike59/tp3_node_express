let mysql = require('mysql');



const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"shop_data"
})

let sql = `SELECT * from gender`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

connection.end(); 