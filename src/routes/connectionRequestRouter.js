
const express=require('express');
const connectionRequestRouter=express.Router();
const {userAuth}=require('../middleware/auth');
const {sendInterestedRequest}=require("../controllers/connectionRequestController");


connectionRequestRouter.post("/send/:status/:toUserId",userAuth,sendInterestedRequest);

module.exports=connectionRequestRouter;