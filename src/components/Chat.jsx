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

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const fetchChatMessages = async () => {
    const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = res.data.messages.map((msg) => ({
      firstName: msg?.senderId?.firstName,
      lastName: msg?.senderId?.lastName,
      text: msg?.text,
    }));

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-screen-sm h-[80vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
        <div className="p-4 bg-blue-600 text-white text-xl font-semibold">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                user.firstName === msg.firstName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm font-medium mb-1">
                {msg.firstName}
              </div>
              <div className="chat-bubble text-base">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex items-center gap-2 bg-gray-50">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
