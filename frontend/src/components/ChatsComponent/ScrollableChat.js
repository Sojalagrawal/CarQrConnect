import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';

import { ChatState } from "../../Context/ChatProvider";
import { isSameUser } from "../../config/ChatLogic";

export default function ScrollableChat({ messages, usedBy,user }) {
    // const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => {
                // const isUserSender = usedBy === "User" ? m.sender._id === user._id : m.sender._id === user._id;

                return (
                    <div style={{ display: "flex" }} key={m._id}>
                        <span
                            style={{
                                backgroundColor: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                                marginLeft: m.sender._id === user._id ? 'auto' : '5px',
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 12,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                );
            })}
        </ScrollableFeed>
    );
}


//"#BEE3F8" : "#B9F5D0",
// "aquamarine":"bisque",