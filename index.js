console.log("hello node");
const express = require("express");
const router = express.Router();

const app = express();
const cors = require("cors");
const corsOptions = {
    origin:["http://localhost:3000"]
}
app.use(cors(corsOptions));


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

const PORT = 5500;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT} `,'<a href="localhost:5500" >server</a>')
});
