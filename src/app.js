const express=require("express");

const app=express();
const {adminAuth,userAuth}=require("./middleware/auth");

app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.get("/admin/getAllData",(req,res)=>{
    res.status(201).send("All admin data sent...");
})

app.get("/user/getAllData",(req,res)=>{
    res.send("User data sent");
})

app.listen(3000,(req,res)=>{
    console.log("Server running at port 3000");
})