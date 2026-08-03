const validator = require('validator');
const bcrypt = require("bcrypt");
const {User}=require('../models/user');

const validateSignupData = (req) => {
    const { firstName, password, emailId } = req.body;

    if (!firstName || !password || !emailId) {
        throw new Error("Enter all the fields...");
    }

    if (firstName.length < 3) {
        throw new Error("First name can't be less than 3 letters...")
    }

    if (!validator.isEmail(emailId)) {
        throw new error("Please enter a correct email id...");

    }

    if (!validator.isStrongPassword(password)) {
        throw new error("Please enter a strong password...");
    }


}

const validateLoginData = (req) => {
    const { password, emailId } = req.body;

    if (!password || !emailId) {
        throw new Error("Enter all the fields...");
    }

    if (!validator.isEmail(emailId)) {
        throw new error("Please enter a correct email id...");

    }

    if (!validator.isStrongPassword(password)) {
        throw new error("Please enter a strong password...");
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoURL",
        "about",
        "skills",
        "age",
        "gender"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    if (!isEditAllowed) {
        throw new Error("Invalid edit request");
    }

    if (
        req.body.photoURL &&
        !validator.isURL(req.body.photoURL)
    ) {
        throw new Error("Invalid Photo URL");
    }

    if (
        req.body.firstName &&
        (req.body.firstName.length < 3 || req.body.firstName.length > 50)
    ) {
        throw new Error("First name should be between 3 and 50 characters");
    }

    if (
        req.body.lastName &&
        (req.body.lastName.length < 3 || req.body.lastName.length > 15)
    ) {
        throw new Error("Last name should be between 3 and 15 characters");
    }

    if (
        req.body.about &&
        req.body.about.length > 200
    ) {
        throw new Error("About cannot exceed 200 characters");
    }

    if (
        req.body.skills &&
        req.body.skills.length > 15
    ) {
        throw new Error("Maximum 15 skills are allowed");
    }

    if (
        req.body.age &&
        (req.body.age < 15 && req.body.age > 101)
    ) {
        throw new Error("Age must be at least 15 and 101");
    }

    if (
        req.body.gender &&
        !["MALE", "FEMALE", "OTHER"].includes(req.body.gender.toUpperCase())
    ) {
        throw new Error("Invalid gender");
    }

};


const validateEditPassword = async (req) => {
    try {
        const { password, newPassword } = req.body;
        const hashedPassword = req.user.password;

        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword) {
            throw new Error("Current password is not correct...");
        }
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New password is not strong,please make a strong password...");
        }
        if (password === newPassword) {
            throw new Error("New password must be different with the current password...");
        }

    }
    catch (err) {
        throw new Error(err.message);
    }
}

const validateConnectionRequest = async(req) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["interested", "ignored"];

        if (fromUserId.toString() === toUserId) {
            throw new Error("You cannot send a connection request to yourself.");
        }

        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status type.");
        }

        const user=await User.findOne({_id:toUserId});
        if(!user){
            throw new Error("User not found...")
        }      

    }
    catch (err) {
        throw new Error(err.message);
    }
}




module.exports = {
    validateSignupData,
    validateLoginData,
    validateProfileEditData,
    validateEditPassword,
    validateConnectionRequest,
};