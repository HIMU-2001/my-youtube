// MainContainer.jsx
import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen min-w-0">
      {/* Filters */}
      <ButtonList />

      {/* Videos */}
      <div className="flex-1 min-w-0">
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;
