import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, generateRandomText } from "../utils/helper";

const LiveChat = () => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    dispatch(
      addMessage({
        name: "Himanshu",
        text: input,
      })
    );
    setInput("");
  };
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.chat);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          text: generateRandomText(),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);
  return (
    <div className="flex flex-col h-full max-h-[500px] border rounded-lg shadow-md p-3 bg-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} name={msg.name} message={msg.text} />
        ))}
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
