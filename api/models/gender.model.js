const  BaseModel = require( "./base.Model");

class GenderModel extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product");
    }

    title = "";
    description = "";
    image = "";

}
module.exports = GenderModel;