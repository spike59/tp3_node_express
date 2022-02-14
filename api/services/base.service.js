const mysql = require("mysql");
class BaseService {
    // connection = 
    currentClass = this.constructor.name;
    modelName = this.currentClass.replace("Service", "");
    tableName = this.modelName.toLowerCase();

    static db;
    static #connect = ()=>{
        if(!BaseService.db){
            BaseService.db= mysql.createPool({
                host:"localhost",
                user:"root",
                password:"",
                database:"shop_data"
            })
        }
        return BaseService.db;
    }
    static #query = async (sql) =>{
        return await new Promise((resolve,reject)=>{
            BaseService.#connect().query(sql,(err,rows)=>{
                if (err){
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }
    async getAll(){
        console.log("service get all");
        let sql = `SELECT * from ${this.tableName}`;
        const rows =  await BaseService.#query(sql);
        console.log("return rows",rows);
        return rows;
    }
    async getOne(){
        console.log("service get one");
        let sql = `SELECT * from ${this.tableName}`;
        const rows =  await BaseService.#query(sql);
        console.log("return rows",rows[0]);
        return rows[0];
    }
    async getOneBySql(sql){
        console.log("service get one by sql");
        //let sql = `SELECT * from ${this.tableName}`;
        const rows =  await BaseService.#query(sql);
        console.log("return rows",rows[0]);
        return rows[0];        
    }
}
module.exports = BaseService;