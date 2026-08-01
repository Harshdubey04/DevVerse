const express=require("express");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const {connectDB}=require("./config/database");
const app=express();
const {User}=require("./models/user");
const bcrypt=require('bcrypt');
const { validateSignupData,validateLoginData }= require("./utils/validate");

//Middleware to convert the json to js object so that server can understand it because server only understand js object
app.use(express.json());

//Making signup api dynamic to get the data form the end user
app.post("/signup",async(req,res)=>{   
    const userData=req.body;
    try{      
        //Validating the signup data
        validateSignupData(req);
        const {emailId,password,firstName,lastName}=req.body;

        //Hashing the password
        const hashedPassword=await bcrypt.hash(password,10);

        const user=new User({
            firstName,lastName,emailId,password:hashedPassword
        });

        await user.save();
        res.send("User Successfully created...");
    }

    catch(err){
        res.status(400).send(err.message);
    }   
    
})

//Login api
app.post("/login",async(req,res)=>{
    try{
        //Validate login data
        validateLoginData(req);
        const{emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials...");
        }
        //compare password
        const isPassValid=await bcrypt.compare(password,user.password);
        if(isPassValid){
            res.send("Logged in successfully...")
        }
        else{
            throw new Error("Password is incorrect...");
        }
    }
    catch(err){
        res.send(err.message);
    }
})

//Feed API-To get all the user data form the database
app.get("/feed",async(req,res)=>{
    try{
        const userData=await User.find({});
        res.send(userData);
    }
    catch(err){
        res.send(err.message);
    }
})

//Get a user by name
app.get("/user",async(req,res)=>{
    try{
        const userName=req.body.firstName;
        const user=await User.find({firstName:userName});
        res.send(user);

    }
    catch(err){
        res.send(err.message);
    }
})

//Delete a user by id 

app.delete("/user",async(req,res)=>{
    const userId=req.body._id;
    try{
        //using findByIdAndDelete(userId)
        // await User.findByIdAndDelete(userId);

        // using findOneAndDelete({_id:userId})
        await User.findOneAndDelete({ _id: userId });

        res.send("User deleted successfully...")
    }
    catch(err){
        res.send(err.message);
    }
})

app.patch("/user/:userId",async(req,res)=>{
        const userId=req?.params.userId;
        const data=req.body;

    try{
        const allowedUpdates=["photoURL","gender","about","skills","password","emailId"];
        const isUpdateAllowed=Object.keys(data).every((k)=>allowedUpdates.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Can't update the data");
        }

        if(data?.skills?.length>15){
            throw new Error("Skills can't be more than 15");
        }

        await User.findOneAndUpdate({_id:userId},data,{runValidators:true});
        
        res.send("User data updated successfully...");
    }
    catch(err){
        res.send(err.message);
    }
})

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


