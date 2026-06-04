import User from "../../models/users.js"

export const getFollowedChannels = async ( req, res ) => {
    try {
        const { userID } = req.user;

        const { followedChannels } = await User.findById(userID, {followedChannels : 1});

        return res.status(200).json({followedChannels});
    } catch (err){
        console.log(err);
        return res.status(500).send("Error occured while fetching followed channels")
    }
}