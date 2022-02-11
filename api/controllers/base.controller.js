class BaseController {
    currentClass = this.constructor.name;
    modelName = this.currentClass.replace("Controller", "");
    
    index = () => {
        return (this.constructor.name + " index controller")
    }
    getAll = async ()=>{
        let serviceClass = await ModuleImporter.import("CategoryService");
        let service = new serviceClass();
        let data = await service.getAll();
        return data;
    }

}
module.exports = BaseController;