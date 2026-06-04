import User from "../../models/users.js";
import axios from "axios";

export const getChannels = async (_,res) => {
    try {
        const users = await User.find({}, {
            channel: 1,
            username: 1,
        }).populate("channel");

        let requestData;
        let activeStreams = { live: {} };
        try {
            requestData = await axios.get("http://localhost:8000/api/streams");
            activeStreams = requestData.data;
        } catch (error) {
            console.log("RTMP server not accessible, assuming no live streams.");
        }

        let liveStreams = [];

        for (const streamId in activeStreams.live){
            if(activeStreams.live[streamId].publisher && activeStreams.live[streamId].publisher !== null){
                liveStreams.push(streamId);
            }
        }

        const channels = users
            .filter(u => u.channel.isActive)
            .map(user => {
                return {
                    id: user.channel._id,
                    title: user.channel.title,
                    avatarURL: user.channel.avatarURL,
                    username: user.username,
                    isOnline: liveStreams.includes(user.channel.streamKey),
                };
            })
            return res.json({
                channels,
            })
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }

    
}