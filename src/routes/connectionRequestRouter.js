
const express=require('express');
const connectionRequestRouter=express.Router();
const {userAuth}=require('../middleware/auth');
const {sendInterestedRequest,reviewConnectionRequest}=require("../controllers/connectionRequestController");


connectionRequestRouter.post("/send/:status/:toUserId",userAuth,sendInterestedRequest);
connectionRequestRouter.patch("/review/:status/:requestId",userAuth,reviewConnectionRequest);

module.exports=connectionRequestRouter;