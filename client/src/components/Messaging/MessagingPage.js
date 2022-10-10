import React, {useState, useEffect, useRef} from 'react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Inbox from './Inbox';
import "./styles.css";
import Button from 'react-bootstrap/Button';
import io from "socket.io-client";
import axios from 'axios';

//randomly generated id to mimic a client
//this would usually be session storage
const id = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

//initialise socket client. connect to backend
//query object can be accessed by socket server
const socket = io("/", {
    query: {
        id: id,
    }
});

const MessagingPage = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(0);

    const sendMessage = () => {
        let messageData = {
            sender: id,
            message: message,
            convoID: conversations[activeConversation].match_id,
        }

        setMessages((messages) => ([...messages, messageData]));

        socket.emit("send_message", {messageData});
        setMessage("");
    }

    //fetch all the matches for the user that logged in
    useEffect(() => {
        const fetchMatches = async () => {
            await axios.get(`/messaging/matches/${id}`)
            .then((data) => {
                setConversations(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        fetchMatches();
    }, []);

    //fetch all the messages for the currently active conversation
    useEffect(() => {
        const fetchMessages = async () => {
            if (conversations.length === 0) {
                return;
            }

            const convoID = conversations[activeConversation].match_id;
            const messages = await axios.get(`/messaging/messages/${convoID}`)
                .then((data) => {
                    setMessages(data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        fetchMessages();
    }, [conversations, activeConversation]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((messages) => ([...messages, data.messageData]));
            console.log(data);
        })
    }, [socket]);

    //switch conversations
    const switchConvo = (index) => {
        console.log(index);
        setActiveConversation(index);
    }

    return (
        <div className="MessagingPage">
            <div className="inbox">
                <Inbox conversations={conversations} active={activeConversation} switchConvo={switchConvo}/>
            </div>
            <div className="chat-history">
                <ChatHistory messages={messages} messageReceived={messageReceived} id={id}/>
            </div>
            <div className="message-input">
                <input value={message} onChange={(event) => {setMessage(event.target.value);}}></input>
                <Button onClick={sendMessage} className="send-btn" variant="primary">Send</Button>
            </div>
        </div>
    );
}

export default MessagingPage;