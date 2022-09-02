import React from 'react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Inbox from './Inbox';
import "./styles.css";

const MessagingPage = () => {
    return (
        <div class="MessagingPage">
            <div class="inbox">
                <Inbox />
            </div>
            <div class="chat-history">
                <ChatHistory/>
            </div>
            <div class="message-input">
                <MessageInput />
            </div>
        </div>
    );
}

export default MessagingPage;