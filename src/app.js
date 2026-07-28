const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const {User}=require("./models/user");



app.post("/signup",async(req,res)=>{   

    try{      
        await User.create({
        "firstName":"Harsh",
        "lastName":"Dubey",
        "age":21,
        });
        res.send("User creaeted succesfully");
    }

    catch(err){
        res.status(400).send(err.message);
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


