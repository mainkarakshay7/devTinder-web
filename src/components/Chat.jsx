import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const fetchChatMessages = async () => {
    const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = res?.data?.messages?.map((msg) => {
      const { firstName, lastName, _id } = msg?.senderId;
      return {
        firstName,
        lastName,
        text: msg.text,
        senderId: _id,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    //as soon as the page loaded, the socket connection is made and joinchat event is emitted
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, senderId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 border border-gray-600 m-5 h-[70vh] flex flex-col justify-center align-middle mx-auto">
      <h1 className="p-5 border-b border-gray-600">Chat window</h1>
      <div className="flex-1 overflow-scroll p-6">
        {/*Message container*/}
        {messages.map((msg, index) => (
          <div
            className={`chat ${
              userId === msg.senderId ? "chat-end" : "chat-start"
            }`}
            key={index}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              {msg.firstName}
              {/* <time className="text-xs opacity-50">12:46</time> */}
            </div>
            <div className="chat-bubble">{msg.text}</div>
            {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
          </div>
        ))}
      </div>
      <div className="p-5 border-b border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-blue rounded p-2"
        ></input>
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
