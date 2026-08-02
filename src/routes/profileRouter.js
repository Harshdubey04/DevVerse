const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require('../middleware/auth');
const {viewProfile,editProfile,editPassword}=require("../controllers/profileController")

profileRouter.get("/viewProfile",userAuth,viewProfile);
profileRouter.patch("/editProfile",userAuth,editProfile);
profileRouter.patch("/editPassword",userAuth,editPassword);



module.exports=profileRouter;