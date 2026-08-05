const { validateProfileEditData, validateEditPassword } = require("../utils/validate");
const bcrypt = require('bcrypt');

const viewProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User not found...");
        }
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully.",
            data: user,
        });
    }

    catch (err) {
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }

}

const editProfile = async (req, res) => {
    try {
        validateProfileEditData(req);
        const loggedInUser = req.user;
        // console.log(loggedInUser);

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();

        return res.status(200).json({
            success: true,
            message: "User data updated successfully.",
            data: loggedInUser,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

const editPassword = async (req, res) => {
    try {
        await validateEditPassword(req);
        const { newPassword } = req.body;
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        const loggedInUser = req.user;
        loggedInUser.password = newHashedPassword;
        // console.log("req.body"+req.body);
        // console.log("loggedin user"+loggedInUser);
        // console.log("loggedin user.password"+loggedInUser.password);
        await loggedInUser.save();
        return res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    viewProfile,
    editProfile,
    editPassword,
}