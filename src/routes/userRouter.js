const express=require('express');
const userRouter=express.Router();
const {userAuth}=require('../middleware/auth'); 
const {requestRecieved,getConnections,userFeed}=require('../controllers/userController');
const { get } = require('mongoose');

userRouter.get('/requests/received',userAuth,requestRecieved);
userRouter.get('/connections',userAuth,getConnections);
userRouter.get('/feed',userAuth,userFeed);


module.exports=userRouter;
