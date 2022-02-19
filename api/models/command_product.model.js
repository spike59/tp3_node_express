const  BaseModel = require( "./base.Model");

class Command_productModel extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    quantity = 0;
    product_id = 0;
    command_id = 0;

}
module.exports = Command_productModel;