import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-start space-x-3 py-2">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
        {name[0]}
      </div>

      {/* Message Content */}
      <div className="bg-gray-100 p-3 rounded-lg max-w-xs md:max-w-md break-words">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
