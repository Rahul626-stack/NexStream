import User from '../../models/users.js'

export const getChannelSettings = async (req, res) => {
    try {
        const { userID } = req.user;

        const userData = await User.findById(userID, {
            channel : 1,
            username : 1,
        }).populate("channel");

        return res.status(200).json({
            id: userData.channel._id,
            username: userData.username,
            title: userData.channel.title,
            description: userData.channel.description,
            avatarURL: userData.channel.avatarURL,
            streamKey: userData.channel.streamKey,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }

}