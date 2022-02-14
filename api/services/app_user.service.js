const BaseService = require('./base.service');
const config = require('../auth/config.json');
const jwt = require('jsonwebtoken');
const Role = require('../auth/role');

class App_userService extends BaseService{

    async authenticate({email,password}){
        console.log("user authenticate",email,password);
        
        //return rows[0];
        //return user
        const mail = "email",pass = "password";
        let sql = `SELECT * from ${this.tableName} WHERE ( ${mail} = '${email}' AND ${pass} = '${password}' );`;
        const user =  await this.getOneBySql(sql);
        console.log("return user",user);

        if (user){
            const token = jwt.sign({sub:user.id,role:user.role},config.secret)
            const {password, ...userWithoutPassword } = user;
            return {
                ...userWithoutPassword,
                token
            };
        }
        return user;
    } 

}

module.exports = App_userService;