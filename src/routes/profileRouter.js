const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require('../middleware/auth');
const {viewProfile}=require("../controllers/profileController")

profileRouter.get("/viewProfile",userAuth,viewProfile);



module.exports=profileRouter;