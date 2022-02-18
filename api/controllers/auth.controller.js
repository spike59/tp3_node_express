//const  BaseController = require( "./base.controller");
const services = require('../services');

//const authorize = require("../auth/authorize");
const Role = require("../auth/role");
const jwt = require('jsonwebtoken');
const { secret } = require('../auth/config.json');
const MailerService = require('../services/mailer.service');
class AuthController {
//class AuthController extends BaseController{
    // constructor(){
    //     super(false)
    //     this.usersService = new services["app_user"]();
    //     console.log("this user service",this.usersService);
    // }
    async register(req,res){
        let usersService = new  services["app_user"]();
        console.log("register user ",req.body);
        const user = await usersService.getOneUserByMail(req.body.email);
        console.log("user ",user);
        if (!user){
            const payload = {mail: req.body.email, role: 1};
            const token = jwt.sign(payload, secret, { expiresIn: '1d' });
            //SEND MAIL
            const html = 
            `
            <b>Confirmez votre inscription : </b>
            <a href="http://localhost:3000/account/validation?t=${encodeURIComponent(token)}" target="_blank">Confirmer</a>
            
            `;
            let mailerService = new MailerService();
            const mailed = await mailerService.sendMail({to: req.body.email, subject:"Confirmer votre inscription", html});
            console.log("mailed",mailed);
            if (mailed)
            {
                return res.status(200).json({ message: 'ok go' });
            }
            
        }
        return res.status(404).json({ message: 'utilisateur existant' });
    }
    async registerOld(req,res,next){
        if(req.method !== 'POST') return {status:405};
        console.log("register",req.body);
        
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        const currentUser = req.user;
        const id = parseInt(req.params.id)        
        //const user = this.getUser(req.body.email);
        usersService.getOneUserByMail(req.body.email)
        .then(user => {
            //user ? res.json(user):res.sendStatus(404)
            if (!user){

                const payload = {mail: req.body.email, role: 1};
                const token = jwt.sign(payload, secret, { expiresIn: '1d' });
                //SEND MAIL
                const html = 
                `
                <b>Confirmez votre inscription : </b>
                <a href="http://localhost:3000/account/validation?t=${encodeURIComponent(token)}" target="_blank">Confirmer</a>
                
                `;
                MailerService.sendMail({to: req.body.email, subject:"Confirmer votre inscription", html})
                .then(result=>{
                    console.log("mail service result",result);
                    if (result)
                    {
                        return res.json({"message":"ok register mail envoyé"})
                    }
                    //res.sendStatus(404);
                });
                

            }
            return false
        })
        .catch(err=>next(err));
        // if(!user){
        //     const payload = {mail: req.body.email, role: 1};
        //     const token = jwt.sign(payload, appConfig.JWT_SECRET, { expiresIn: '1d' });
        //     //SEND MAIL
        //     const html = 
        //     `
        //     <b>Confirmez votre inscription : </b>
        //     <a href="http://localhost:3000/account/validation?t=${encodeURIComponent(token)}" target="_blank">Confirmer</a>
            
        //     `;
        //     this.sendMail(req,res).then(
        //         result=>{
        //             return true
        //         }
        //     )
        //     //return true;
        // }
        return false;        
    }
    async sendMail(req,res){
       
    }
    
    authenticate(req,res,next){
        console.log("services",services);
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        usersService.authenticate(req.body)
            .then(user => user ? res.json(user):res.status(400).json({message:"username or password invalid"}))
            .catch(err => next(err));
    }

    getAllUsers(req,res,next){
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        usersService.getAllUsers()
        .then(users => res.json(users))
        .catch(err=>next(err));
    }

    getUser(req,res,next){
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        const currentUser = req.user;
        const id = parseInt(req.params.id)

        if (id !== currentUser.sub && currentUser.role !== Role.Admin){
            return res.status(401).json({message:'unauthorized'});
        }

        usersService.getOneUser(req.params.id)
        .then(user => user ? res.json(user):res.sendStatus(404))
        .catch(err=>next(err));
    }

}
module.exports = AuthController;