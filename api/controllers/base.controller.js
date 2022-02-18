const services = require("../services");

class BaseController {
    constructor(default_controllers = true){
        // this.router = Router();
        // this.name = this.constructor.name.replace(`Router`,``);
        // this.table = this.name.toLowerCase();
        // this.ct  = new controllers[this.table]();
        this.currentClass = this.constructor.name;
        this.modelName = this.currentClass.replace("Controller", "");
        this.serviceClass = new services[this.modelName.toLowerCase()];

        if (default_controllers){
            this.initializeControllers();
        }
        
    }

    initializeControllers = ()=>
    {

        this.index = async () => {
            console.log("index controller");
            
            let allData= await this.serviceClass.getAll();
            //console.log("controller end get all",allData);      
            return  allData;

            //return (this.constructor.name + " index controller")
            //return "ok";
        }
        this.getAll = async () => {
            let serviceClass = await ModuleImporter.import("CategoryService");
            let service = new serviceClass();
            let data = await service.getAll();
            return data;
        }
        // newItem = async () => {
        //     let allData= await this.serviceClass.getAll();

        //     return data;        
        // }
    }

}
module.exports = BaseController;