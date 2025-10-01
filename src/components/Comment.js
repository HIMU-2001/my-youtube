import React from "react";
import { USER_AVATAR } from "../utils/constant";

const Comment = ({ username, text }) => {
  return (
    <div className="flex items-start space-x-3">
      {/* Avatar */}
      <img
        src={USER_AVATAR}
        alt={username}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />

      {/* Content */}
      <div className="flex flex-col bg-gray-50 rounded-lg px-4 py-2 w-full">
        <span className="font-medium text-gray-800 text-sm sm:text-base">
          {username}
        </span>
        <p className="text-gray-700 text-sm sm:text-base">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
