const BaseRouter = require('./base.router');

class AuthRouter extends BaseRouter {
    constructor(){
        super()
        this.add_routes()
    }
    add_routes = () => {    
    //create new
        this.router.post('/login',(req, res) => {
            let response = "added route!";
            res.send(response);
            //res.send(`create new ${this.table} row with values : ${JSON.stringify(req.body)}`);
        })
    }
}

module.exports = AuthRouter;