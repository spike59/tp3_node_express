const express = require("express");
const routers = require('./api/routers');
const errorHandler = require('./api/helpers/error_handler');
const MailerService = require('./api/services/mailer.service');
console.log(routers)

const app = express();

const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:3000"]
};
app.use(cors(corsOptions));

app.use(express.json());



for(const route in routers){
  app.use(`/${route}`, new routers[route]().router);
}
app.use(errorHandler);

//TEST
const mailerService = new MailerService();
mailerService.sendMail({})
const mailer = MailerService.sendMail({to:"bedulaurent@gmail.com", subject:"Validation de compte", html:'<button>Valider l\'inscription</button>'});
console.log();




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});