
const  BaseModel = require( "./base.Model");

class CategoryModel extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product");
    }

    title = "";
    description = "";
    image = "";

}
module.exports = CategoryModel;