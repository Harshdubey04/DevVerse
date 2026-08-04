const {validateLoginData,validateSignupData}=require('../utils/validate');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../models/user');



//Signup
const signup=async(req,res)=>{   
    const userData=req.body;
    try{      
        //Validating the signup data
        validateSignupData(req);
        const {emailId,password,firstName,lastName,age,gender,photoURL,about,skills}=req.body;

        //Hashing the password
        const hashedPassword=await bcrypt.hash(password,10);

        const user=new User({
            firstName,lastName,emailId,password:hashedPassword,
            age,gender,photoURL,about,skills
        });

        await user.save();
        res.json({
            "message":"Account Successfully created...",
            "userData":user
        });
    }

    catch(err){
        res.status(400).send(err.message);
    }   
    
}

//Login 
const login=async(req,res)=>{
    try{
        //Validate login data
        validateLoginData(req);
        const{emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid credentials...");
        }

        const {_id}=user;

        //compare password
        const isPassValid=await user.validatePassword(password);
        
        if(isPassValid){
            //Generate jwt token
            const token=await user.getJWT();
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
            res.json({
                "message":"Logged in successfully...",
                "userData":user
            });
        }
        else{
            throw new Error("Password is incorrect...");
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

//Logout
const logout=async(req,res)=>{
    try{
        const {token}=req.cookies;
        res.cookie("token",token,{expires:new Date(Date.now())});
        res.send("Logged out Successfully...");
    }catch(err){
        res.status(401).send(err.message);
    }
}

module.exports={
    signup,
    login,
    logout
}