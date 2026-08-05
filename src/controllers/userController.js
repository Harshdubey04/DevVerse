const { ConnectionRequest } = require('../models/connectionRequestSchema');
const { User } = require('../models/user');

//Get all pending connection request of the logged in user
const requestRecieved = async (req, res) => {
    try {
        const loggedInUser = req.user;
        // console.log("logged in user: "+loggedInUser);

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoURL age gender about gender");

        const data = connectionRequests.map((req) => req.fromUserId);

        return res.status(200).json({
            success: true,
            message: "Pending connection requests fetched successfully.",
            data,
        });

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

//Get all the connections of a logged in user
const getConnections = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ],
            status: "accepted"
        }).populate("fromUserId", "firstName lastName photoURL age gender about gender")
            .populate("toUserId", "firstName lastName photoURL age gender about gender")

        const data = connections.map((conn) => {
            if (loggedInUser._id.toString() === conn.fromUserId._id.toString()) {
                return conn.toUserId;
            }
            else {
                return conn.fromUserId;
            }
        })

        return res.status(200).json({
            success: true,
            message: "Connections fetched successfully.",
            data,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

//Feed API
const userFeed = async (req, res) => {
    try {
        const USER_SAFE_DATA = "firstName lastName photoURL about skills age gender";
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 10 ? 10 : limit;
        const skip = (page - 1) * limit;

        //Find all the connections sent or recieved by loggeed in user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        //Find the unique ids of the hidden users
        const hiddenUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            hiddenUsersFromFeed.add(req.fromUserId.toString());
            hiddenUsersFromFeed.add(req.toUserId.toString());
        });

        //Find all the users who are not hidden form feed and not the loggedIn user
        const allowedUsers = await User.find({
            $and: [
                { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        if (allowedUsers.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No more users found for this page.",
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Feed fetched successfully.",
            data: allowedUsers,
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
    requestRecieved,
    getConnections,
    userFeed
}