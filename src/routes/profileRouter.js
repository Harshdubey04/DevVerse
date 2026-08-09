const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require('../middleware/auth');
const {viewProfile,editProfile,editPassword,viewUserProfile}=require("../controllers/profileController")

profileRouter.get("/viewProfile",userAuth,viewProfile);
profileRouter.patch("/editProfile",userAuth,editProfile);
profileRouter.patch("/editPassword",userAuth,editPassword);
profileRouter.get("/:userId",userAuth,viewUserProfile);


module.exports=profileRouter;