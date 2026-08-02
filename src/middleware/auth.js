const jwt=require("jsonwebtoken");
const {User}=require("../models/user");

const userAuth=async(req,res,next)=>{
    try{
        //Getting the token
        const {token}=req.cookies;
        if(!token){
            throw new Error("Invalid token");
        }
        //Validate the token
        const decodedData=await jwt.verify(token,"Harsh@123");
        // console.log(decodedData);
        const {_id}=decodedData;
        

        //Find the user form DB using the _id and explicitly attach password
        const user=await User.findById(_id).select("+password");
        if(!user){
            throw new Error("User not found...");
        }

        // console.log("Middleware password:", user.password);

        //Attach the user to the req object so that it can be used to find the user data in  request handler
        req.user=user;
        next();


    }catch(err){
        res.status(400).send(err.message);
    }
}

module.exports={userAuth};