import Channel from "../../models/Channel.js";
import User from "../../models/users.js"

export const putChannelSettings = async (req, res) => {
    try {
        const { userID } = req.user;
        
        const { title, description, username, avatarURL } = req.body;

        const userData = await User.findById(userID, {username : 1, channel : 1});

        if (userData.username !== username){
            await User.updateOne({ _id: userID}, { username });
        }
        
        const channelData = await Channel.findByIdAndUpdate(userData.channel._id, {
            title,
            description,
            avatarURL,
            isActive: true,
        }, {new: true});

        return res.status(200).json({
            channelId: channelData._id,
            username,
            title: channelData.title,
            description: channelData.description,
            avatarURL: channelData.avatarURL,
        })

    } catch (err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
};