import React from "react";

const ChannelAvatar = ({ url }) => {
    return (
        <div className="channels-avatar-container">
            <img src={url || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} alt="avatar" width="100%" height="100%" />
        </div>
    );
};

export const ChannelCard = ({
    title,
    id,
    username,
    avatarURL,
    isOnline,
    navigateToChannelHandler,
}) => {
    const handleNavigate = () => {
        navigateToChannelHandler(id);
    };

    return (
        <div className="channels-card" onClick={handleNavigate}>
            <ChannelAvatar url={avatarURL} />
            <div className="channels-card-body">
                <div className="channels-card-title">{username}</div>
                <div className="channels-card-text">{title}</div>
                <span className={`channels-card-badge ${isOnline ? "online" : "offline"}`}>
                    {isOnline ? "🔴 LIVE" : "Offline"}
                </span>
            </div>
        </div>
    );
};


