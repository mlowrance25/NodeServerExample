
require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');


const http = require("http");
const router = require('./routes/customerRouter.js')(app);

const seedData = require('./seedData.js');

app.use(bodyParser.urlencoded({ extended: true,limit:"50mb" }));
app.use(bodyParser.json({limit:"50mb"}));
app.use(cookieParser());
app.use(cors());

var httpServer = http.createServer({}, app);

httpServer.listen(process.env.PORT, () => {
    console.log(`server starting on port : ${process.env.PORT}`)
});

app.use('/customer',router);

const mongoose = require("mongoose"), Admin = mongoose.mongo.Admin;

var mongoDBURL = process.env.MONGODB_URL
if(process.env.ENV === 'Test'){
   mongoDBURL = process.env.MONGOTESTDB_URL
}

mongoose.connect(mongoDBURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true });

const customerRepo = require('./services/customerrepository')
customerRepo.getAllCustomers().then(customers =>{
    if(customers.length == 0){
        let usersToCreate = seedData.getUsers(50);
        for(let index= 0;index < usersToCreate.length;index++){
            customerRepo.createUser(usersToCreate[index]);
        }
    }
});


module.exports = app;