const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require( "body-parser");
const cors = require ("cors");
const dotenv = require ("dotenv").config();
const app = express();


app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

const userRoute = require("./routes/userController");
app.use("/",userRoute);

mongoose.connect(URL)
.then(()=>{
        console.log("DB Connected");   
        }
    )
.catch((error)=>
        {
            console.log("DB Connection error: " + error);   
        }
    )
 app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
 });