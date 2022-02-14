const express = require("express");
const routers = require('./api/routers');
const errorHandler = require('./api/helpers/error_handler');

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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});