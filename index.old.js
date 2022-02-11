console.log("hello node");

const express = require("express");
//const bodyParser = require('body-parser');

const router = express.Router();

const app = express();
const cors = require("cors");
const corsOptions = {
    origin:["http://localhost:3000"]
}
app.use(cors(corsOptions));


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

app.use(router);

router.route("/")
.get((req,res) => {
    console.log("Get /");
    res.send("Welcome to node Express App")
})
.post((req,res) => {
    console.log("post /");
    res.send(req.method + req.path);
});

router.route("/test").get((req,res) => {
    console.log("Get /");
    res.send(req.method + req.path);
});

router.route("/form").get((req,res) => {
    console.log("recuperation form get");
    let mail = req.body.email
    console.log("mail",mail);
    console.log("body",req.body);
    res.send(req.method + req.path + "mail" + mail );
});
router.route("/form").post((req,res) => {
    console.log("recuperation form post");
    // let mail = req.body.email
    // console.log("mail",mail);
    console.log("body",req.body);
    res.send(
        req.method + 
        req.path + 
        "\nbody\n" + 
        req.body.email +
        req.body.password +
        req.body.message 
        );
});

const PORT = 5500;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT} `)
});
