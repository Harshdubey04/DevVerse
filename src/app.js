const express=require("express");
const {connectDB}=require("./config/database");
const app=express();
const {User}=require("./models/user");

//Middleware to convert the json to js object so that server can understand it 
app.use(express.json());


//Automatic getting dynamic data using postman
app.post("/signup",async(req,res)=>{   

    try{      
        const userData=req.body;
        const user=new User({userData});
        await user.save();
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


