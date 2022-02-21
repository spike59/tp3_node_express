const BaseRouter = require('./base.router');
const services = require('../services');

const authorize = require("../auth/authorize");
const Role = require("../auth/role");

class AuthRouter extends BaseRouter {
    constructor(){
        super(false)
        this.usersService = new services["app_user"]();
        console.log("this user service",this.usersService);
        this.add_routes(this.usersService)
    }
    add_routes = () => {
        //this.router.post('/register',this.ct.register );
        this.router.post('/register',async (req,res)=>{
            const response = await this.ct.register(req,res);
            //console.log("response ", response);
            res.status(response.status||200).json(response.data);
        } );

        this.router.post('/login',this.ct.authenticate );
        this.router.get('/validate',async (req,res)=>{
            return (res.status(404).json({message:"erreur get sur validate"}))
            }
        );
        // this.router.post('/validate',async (req,res)=>{
        //     return (res.status(404).json({message:"erreur post sur validate"}))
        //     }
        // );
        //this.router.post('/validate',this.ct.validate )
        this.router.post('/validate',async (req,res)=>{
            console.log("start validate request");
            const response = await this.ct.validate(req,res);
            //console.log("response Data",responseData.body);
            res.status(response.status||200).json(response.data);
            // if (responseData.status){
            //     return responseData;
            //     //res.status(200).json(responseData);
            // }
            // else{
            //     res.status(500).json({"message":"erreur a la validation"});
            // }
            //console.log("auth router validate response ", response);
            //res.status(response.status||200).json(response.data);
        } );

        this.router.get('/',authorize(Role.Admin),this.ct.getAllUsers);
        this.router.get('/:id',authorize(),this.ct.getUser);
    }
}

module.exports = AuthRouter;