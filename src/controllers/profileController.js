const {validateProfileEditData,validateEditPassword}=require("../utils/validate");
const bcrypt=require('bcrypt');

const viewProfile=async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            throw new Error("User not found...");
        }
        res.send(user);
    }

    catch(err){
        res.status(400).send(err.message);
    }

}

const editProfile=async(req,res)=>{
    try{
        validateProfileEditData(req);
        const loggedInUser=req.user;
        // console.log(loggedInUser);
            
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();

        res.json({
            "message":"User data updated successfully...",
            "updatedData":loggedInUser,
        })
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const editPassword=async(req,res)=>{
    try{
        await validateEditPassword(req);
        const {newPassword}=req.body;
        const newHashedPassword=await bcrypt.hash(newPassword,10);
        const loggedInUser=req.user;
        loggedInUser.password=newHashedPassword;
        // console.log("req.body"+req.body);
        // console.log("loggedin user"+loggedInUser);
        // console.log("loggedin user.password"+loggedInUser.password);
        await loggedInUser.save();
        res.send("Password changed Successfully...");
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports={
    viewProfile,
    editProfile,
    editPassword,
}