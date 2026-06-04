import User from "../../models/users.js"
import Channel from "../../models/Channel.js";
import axios from "axios";

export const getChannelDetails = async (req,res) => {
    try {
        const { channelId } = req.params;

        const channel = await Channel.findById(channelId);

        if(!channel || !channel.isActive){
            return res.status(400).send("Channel not found");
        }

        const user = await User.findOne({ channel: channelId}, {username: 1})

        const streamUrl = `http://localhost:8000/live/${channel.streamKey}.flv`;

        let activeStreams = { live: {} };
        try {
            const requestData = await axios.get("http://localhost:8000/api/streams");
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

        const isOnline = liveStreams.includes(channel.streamKey);

        return res.status(200).json({
            id: channel._id,
            title: channel.title,
            description: channel.description,
            username: user.username,
            isOnline,
            streamUrl: streamUrl,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Channel not found. Please check your channel url");
    }

    
};