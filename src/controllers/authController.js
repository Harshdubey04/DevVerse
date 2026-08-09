const { validateLoginData, validateSignupData } = require('../utils/validate');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');



//Signup
const signup = async (req, res) => {
    try {
        //Validating the signup data
        validateSignupData(req);
        const { emailId, password, firstName, lastName, age, gender, photoURL, about, skills } = req.body;

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: hashedPassword,
            age, gender, photoURL, about, skills
        });

        await user.save();

        
        const token = await user.getJWT();

        
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 8 * 3600000)
        });

        // Don't send password to frontend
        const userData = user.toObject();
        delete userData.password;

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            data: userData,
        });
    }

    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

}

//Login 
const login = async (req, res) => {
    try {
        const USER_SAFE_DATA = "firstName lastName password photoURL about skills age gender";
        //Validate login data
        validateLoginData(req);
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId }).select(USER_SAFE_DATA);
        

        if (!user) {
            throw new Error("Invalid credentials...");
        }
        
        //compare password
        const isPassValid = await user.validatePassword(password);

        if (isPassValid) {
            //Removing password form the user data
            const userData=user.toObject();
            delete userData.password;

            //Generate jwt token
            const token = await user.getJWT();
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
            return res.status(200).json({
                success: true,
                message: "Logged in successfully.",
                data: userData,
            });
        }
        else {
            throw new Error("Password is incorrect...");
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

//Logout
const logout = async (req, res) => {
    try {
        const { token } = req.cookies;
        res.cookie("token", token, { expires: new Date(Date.now()) });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    signup,
    login,
    logout
}