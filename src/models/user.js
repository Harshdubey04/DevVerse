
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:50        
    },
    emailId:{
        type:String,
        required:true,
        minLength:5,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        maxLength:30
    },
    age:{
        type:Number,
        min:15,
        max:101
    },
    gender:{
        type:String,
        validate:(value)=>{
            if(!["Male","Female","Others"].includes(value)){
                throw new Error("Invalid gender entered...!");
            }
        }
    },
},{ timestamps: true })

const User=mongoose.model("User",userSchema);

module.exports={
    User
}