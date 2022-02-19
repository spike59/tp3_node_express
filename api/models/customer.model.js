const  BaseModel = require( "./base.Model");

class CustomerModel extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Command");
        this.hasOneToo("Appuser");
    }

    fullname = "";
    email = "";

}
module.exports = CustomerModel;