import React from 'react';
import MessagingPage from '../Messaging/MessagingPage';
import {useCookies} from 'react-cookie';
import io from "socket.io-client";

const Messages = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const id=cookies.UserId;
    const socket = io("/", {
        query: {
            id: id,
        }
    });
  return (
    <>
        <MessagingPage socket={socket}/>
    </>
  )
}

export default Messages