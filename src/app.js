const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const {User}=require("./models/user");

//Middleware to convert the json to js object so that server can understand it because server only understand js object
app.use(express.json());

//Making signup api dynamic to get the data form the end user
app.post("/signup",async(req,res)=>{   
    const userData=req.body;
    try{      
        
        const user=new User(userData);
        await user.save();
        res.send("User Successfully created...");
        
    }

    catch(err){
        res.status(400).send(err.message);
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


connectDB()
.then(()=>{
    console.log("Connected to DB successfully");
    app.listen(3000,(req,res)=>{
    console.log("Server running at port 3000");
})
})
.catch(err=>{
    console.log(err)
})


