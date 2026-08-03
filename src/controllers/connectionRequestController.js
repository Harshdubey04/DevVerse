const { ConnectionRequest } = require('../models/connectionRequestSchema');
const { validateConnectionRequest } = require('../utils/validate');



const sendInterestedRequest = async (req, res) => {
    try {
        await validateConnectionRequest(req);

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
            res.status(400).json({
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
            message: `${fromUserId.firstName} sent an ${status} request to ${toUser.firstName}.`,
            data,
        });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    sendInterestedRequest,

}