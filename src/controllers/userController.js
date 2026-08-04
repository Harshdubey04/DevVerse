const { ConnectionRequest } = require('../models/connectionRequestSchema');

//Get all pending connection request of the logged in user
const requestRecieved=async(req,res)=>{
    try{
        const loggedInUser=req.user;
        // console.log("logged in user: "+loggedInUser);

        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName photoURL age gender about gender");

        const data=connectionRequests.map((req)=>req.fromUserId);

        res.status(200).json({
            data:data
        });

    }
    catch(err){
        res.status(400).send(err.message);
    }
}

//Get all the connections of a logged in user
const getConnections=async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connections=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id},
                {fromUserId:loggedInUser._id}
            ],
            status:"accepted"
        }).populate("fromUserId","firstName lastName photoURL age gender about gender")
          .populate("toUserId","firstName lastName photoURL age gender about gender")

          const data=connections.map((conn)=>{
            if(loggedInUser._id.toString()===conn.fromUserId._id.toString()){
                return conn.toUserId;
            }
            else{
                return conn.fromUserId;
            }
          })

          res.send(data);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

//Feed API
const userFeed=async(req,res)=>{
    try{

        const loggedInUser=req.user;

        //Find all the connections sent or recieved by loggeed in user
        const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId").populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");

        res.send(connections);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

module.exports={
    requestRecieved,
    getConnections,
    userFeed
}