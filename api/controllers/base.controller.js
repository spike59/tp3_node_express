const services = require("../services");

class BaseController {
    
    currentClass = this.constructor.name;
    modelName = this.currentClass.replace("Controller", "");
    serviceClass = new services[this.modelName.toLowerCase()];
   

    index = async () => {
        console.log("index controller");
        
        let allData= await this.serviceClass.getAll();
        //console.log("controller end get all",allData);      
        return  allData;

        //return (this.constructor.name + " index controller")
        //return "ok";
    }
    getAll = async () => {
        let serviceClass = await ModuleImporter.import("CategoryService");
        let service = new serviceClass();
        let data = await service.getAll();
        return data;
    }
    new =async () => {
        let allData= await this.serviceClass.getAll();

        return data;        
    }

}
module.exports = BaseController;