import React, { useState } from "react";
import Button from "./Button";

const ButtonList = () => {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "News",
    "Sports",
    "Podcasts",
    "Movies",
    "Trending",
    "Coding",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex gap-3 px-4 py-2 bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
      {categories.map((category, index) => (
        <Button
          key={index}
          label={category}
          active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        />
      ))}
    </div>
  );
};

export default ButtonList;
