const  BaseModel = require( "./base.Model");

class CommandModel extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Customer");
        this.hasManyThrough("Product", "Command_product");
    }

    numero = "";
    validation_date = new Date();
    customer_id = 0;

}
module.exports = CommandModel;