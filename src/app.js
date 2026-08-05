const express=require("express");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const {connectDB}=require("./config/database");
const app=express();
const {User}=require("./models/user");
const bcrypt=require('bcrypt');
const { validateSignupData,validateLoginData }= require("./utils/validate");
const jwt=require('jsonwebtoken');
const cookieParser=require("cookie-parser");
const {userAuth}=require("./middleware/auth");
const cors=require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
//Middleware to convert the json to js object so that server can understand it because server only understand js object
app.use(express.json());
app.use(cookieParser());//Cookie parser middleware

const authRouter=require('./routes/authRouter');
const profileRouter=require('./routes/profileRouter');
const connectionRequestRouter=require('./routes/connectionRequestRouter');
const userRouter=require('./routes/userRouter');

app.use("/",authRouter);
app.use("/profile",profileRouter);
app.use('/request',connectionRequestRouter);
app.use('/user',userRouter);


connectDB()
.then(()=>{
    console.log("Connected to DB successfully");
    app.listen(3000,(req,res)=>{
    console.log("Server running at port 3000");
})
})
.catch(err=>{
    console.log(err.message);
})


