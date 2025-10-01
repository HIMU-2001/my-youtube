// VideoContainer.jsx
import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_API);
      const json = await data.json();
      setVideos(json.items || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="w-full p-2 sm:p-4">
      <div
        className="
          grid gap-4 
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
        "
      >
        {videos?.map((video) => (
          <Link to={"watch?v=" + video.id} key={video.id}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoContainer;
