import React, {useState, useEffect, useRef} from 'react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Inbox from './Inbox';
import "./styles.css";
import Button from 'react-bootstrap/Button';
import io from "socket.io-client";

const socket = io.connect("/");

const MessagingPage = () => {

    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => {
        socket.emit("send_message", {message});
        setMessage("");
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {setMessageReceived(data.message)})
    }, [socket]);

    return (
        <div className="MessagingPage">
            <div className="inbox">
                <Inbox />
            </div>
            <div className="chat-history">
                <ChatHistory messageReceived={messageReceived}/>
            </div>
            <div className="message-input">
                {/* <MessageInput /> */}
                <input value={message} onChange={(event) => {setMessage(event.target.value);}}></input>
                <Button onClick={sendMessage} className="send-btn" variant="primary">Send</Button>
            </div>
        </div>
    );
}

export default MessagingPage;