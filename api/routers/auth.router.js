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
    add_routes = (usersService) => {    
        this.router.post('/login',authenticate )
        this.router.get('/',authorize(Role.Admin),getAllUsers);
        this.router.get('/:id',authorize(),getById);

        function authenticate(req,res,next){
            console.log("services",services);
            console.log("this user service2",usersService);
            usersService.authenticate(req.body)
                .then(user => user ? res.json(user):res.status(400).json({message:"username or password invalid"}))
                .catch(err => next(err));
        }
        function getAllUsers(req,res,next){
            usersService.getAll()
            .then(users => res.json(users))
            .catch(err=>next(err));
        }
        function getById(req,res,next){
            const currentUser = req.user;
            const id = parseInt(req.params.id)

            if (id !== currentUser.sub && currentUser.role !== Role.Admin){
                return res.status(401).json({message:'unauthorized'});
            }

            usersService.getOne(req.params.id)
            .then(user => user ? res.json(user):res.sendStatus(404))
            .catch(err=>next(err));
        }
    }
}

module.exports = AuthRouter;