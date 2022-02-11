class BaseService {
    currentClass = this.constructor.name;
    modelName = this.currentClass.replace("Service", "");
    

}
module.exports = BaseService;