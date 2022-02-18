const BaseService = require('./base.service');
const config = require('../auth/config.json');
const jwt = require('jsonwebtoken');
const Role = require('../auth/role');
const Bcrypt = require('bcrypt');


class App_userService extends BaseService{

    async authenticate({email,password}){
        console.log("user authenticate",email,password);
        
        //return rows[0];
        //return user

        const mail = "email",pass = "password";
        //let sql = `SELECT * from ${this.tableName} WHERE ( ${mail} = '${email}' AND ${pass} = '${password}' );`;
        let sql = `SELECT * from ${this.tableName} WHERE ( ${mail} = '${email}' );`;
        const user =  await this.getOneBySql(sql);
        //console.log("return user",user);
        
        //TODO creation de compte
        // let adminpwd;
        let adminpwd = Bcrypt.hashSync("user", 10, function(err, hash) {
            return hash;
        });
        console.log("hash",adminpwd);
        if (user){
            //console.log("user");           
            let usertest = Bcrypt.compareSync(password,user.password);
            //console.log("aprés b crypt",usertest);
            if (usertest){
                const token = jwt.sign({sub:user.id,role:user.role},config.secret)
                const {password, ...userWithoutPassword } = user;
                //console.log("user final", {...userWithoutPassword});
                return ({
                    ...userWithoutPassword,
                    token
                });
            }
        }
        return null;
    } 
    async getOneUser(id){
        console.log("service get one user ");
        let key = "id";
        let sql = `SELECT * from ${this.tableName} WHERE (${key} = '${id}');`;
        console.log("sql",sql);
        const user =  await this.getOneBySql(sql);
        console.log("return user 0",user);
        if (user){
            const {password,...userWithoutPassword} = user;
            return userWithoutPassword;
        }
        else{
            return null;
        }
        
    }
    async getOneUserByMail(mail){
        console.log("service get one user ");
        let key = "email";
        let sql = `SELECT * from ${this.tableName} WHERE (${key} = '${mail}');`;
        console.log("sql",sql);
        const user =  await this.getOneBySql(sql);
        console.log("return user 0",user);
        if (user){
            const {password,...userWithoutPassword} = user;
            return userWithoutPassword;
        }
        else{
            return null;
        }
        
    }
    async getAllUsers(){
        console.log("service get all users ");
        const users =  await this.getAll();
        console.log("return users",users);
        if (users){
            return users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
        }
        else{
            return null;
        }
        
    }
}

module.exports = App_userService;