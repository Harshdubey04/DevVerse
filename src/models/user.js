
const mongoose=require("mongoose");
const validator=require("validator");

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
        maxLength:15        
    },
    emailId:{
        type:String,
        required:true,
        minLength:5,
        maxLength:30,
        unique:true,
        trim:true,
        validate:{
            validator:(value)=>{
                if(!validator.isEmail(value)){
                    throw new Error("Enter a valid email id");
                }
            }
        }
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
    photoURL:{
        type:String,
        default:"https://media.licdn.com/dms/image/v2/D5635AQERO96Ty6cpdg/profile-framedphoto-shrink_800_800/B56Zr29CmAL8Ak-/0/1765079788304?e=1785952800&v=beta&t=4dE67-M7DoKwGjRnAhgyhe6LRYkgcI8l9M-g-a1OnpM",
        validate:{
            validator:(value)=>{
                if(!validator.isURL(value)){
                    throw new Error("Enter a valid image URL");
                }
            }
        }
    },
    about:{
        type:String,
        default:"Add something about yourself.",
        maxLength:200,
        minLength:30
    },
    skills:{
        type:[String]
    }

},{ timestamps: true })

const User=mongoose.model("User",userSchema);

module.exports={
    User
}