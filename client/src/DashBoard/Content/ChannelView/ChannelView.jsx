import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Chat } from "./Chat/Chat";
import { ChannelDescription } from "./ChannelDescription";
import { useChannelDetails } from "../../../shared/hooks";
import { LoadingSpinner } from "../../../shared/components";
import flvjs from "flv.js";

export const Stream = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;
    if (!flvjs.isSupported()) return;

    const player = flvjs.createPlayer({
      type: "flv",
      url: streamUrl,
      isLive: true,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
    player.play();

    return () => {
      player.destroy();
    };
  }, [streamUrl]);

  return (
    <div className="channel-video-container">
      <video ref={videoRef} controls autoPlay style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export const ChannelView = ({ getChannels }) => {
  const { isFetching, getChannelDetails, channelDetails } = useChannelDetails();

  const { id } = useParams();

  useEffect(() => {
    getChannelDetails(id);
  }, []);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="channel-container">
      <div className="channel-video-description-section">
        
        {channelDetails.isOnline ? (<Stream 
          streamUrl = {channelDetails.streamUrl}
        />) :
        (<div className="channel-offline-placeholder">
          <span>Channel is offline</span>
        </div>)
        }
        <ChannelDescription
          channelId={channelDetails.id}
          title={channelDetails.title}
          description={channelDetails.description}
          username={channelDetails.username}
          getChannels={getChannels}
        />
      </div>
      <Chat channelId={channelDetails.id}/>
    </div>
  );
};
