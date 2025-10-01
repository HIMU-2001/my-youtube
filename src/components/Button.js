import React from "react";

const Button = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition 
        ${
          active
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
};

export default Button;
