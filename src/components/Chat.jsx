import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  console.log(targetUserId);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  // load the message here

  const fetchChatMessages = async () => {
    const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(res?.data?.messages);

    const chatMessages = res.data.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    // as soon as the page reloaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
      console.log(firstName + " " + newMessage);
      console.log(messages);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className=" bg-gray-300 w-1/3 m-auto my-10 border border-black h-96 relative">
      <h1 className="border border-black">chat</h1>
      {/**messsage */}
      <div className="mx-2 h-[75%] overflow-y-auto scroll">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div className="chat-header">
                {msg.firstName}
                {/*<time className="text-xs opacity-50">12:46</time>*/}
              </div>
              <div className="chat-bubble">{msg.text}</div>
              {/*<div className="chat-footer opacity-50">Seen at 12:46</div>*/}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 w-full bg-white">
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          className="w-[81%] bg-gray-100 h-8 rounded-lg"
          type="text"
          placeholder="message here"
        />
        <button className="btn btn-secondary px-11 " onClick={sendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
