const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("Server running at port 3000");
})

app.listen(3000,(req,res)=>{
    console.log("Server running at port 3000");
})