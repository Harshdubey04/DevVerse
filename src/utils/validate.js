const validate=require("validator");
const validateSignupData=(req)=>{
    const {firstName,password,emailId}=req.body;

    if(!firstName || !password || !emailId){
        throw new Error("Enter all the fields...");
    }

    if(firstName.length<3){
        throw new Error("First name can't be less than 3 letters...")
    }

    if(!validate.isEmail(emailId)){
        throw new error("Please enter a correct email id...");

    }

    if(!validate.isStrongPassword(password)){
        throw new error("Please enter a strong password...");       
    }


}

module.exports={validateSignupData};