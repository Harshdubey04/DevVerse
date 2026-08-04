const { ConnectionRequest } = require('../models/connectionRequestSchema');
const { validateConnectionRequest, validateConnectionReview } = require('../utils/validate');



const sendInterestedRequest = async (req, res) => {
    try {
        const toUser= await validateConnectionRequest(req);
        const loggedInUser = req.user;

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnectionRequest) {
            return res.status(400).json({
                "message": "Connection request already sent..."
            })
        }

        //Creating new connection request
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save();
        res.status(201).json({
            message: `${loggedInUser.firstName} sent an ${status} request to ${toUser.firstName}.`,
            data,
        });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const reviewConnectionRequest = async (req, res) => {
    try {
        validateConnectionReview(req);
        const { status, requestId } = req.params;
        const loggedInUser = req.user;

        //Make sure that the loggedIn User is reciever
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
        });

        if (!connectionRequest) {
            return res.status(404).json({
                message: "Connection request not found."
            });
        }

        //If Connection request is already accepted/rejected
        if (connectionRequest.status !== "interested") {
            return res.status(400).json({
                message: `Connection request already ${connectionRequest.status}.`
            });
        }
        //Update the status of connection request
        connectionRequest.status = status;

        //save in DB
        const data = await connectionRequest.save();

        res.status(200).json({
            message: "Connection request " + status,
            data: data
        })
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    sendInterestedRequest,
    reviewConnectionRequest,
}