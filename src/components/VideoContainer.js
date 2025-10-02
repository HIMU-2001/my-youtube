// VideoContainer.jsx
import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../utils/videosSlice";
import ShimmerVideoCard from "./ShimmerVideoCard";

const VideoContainer = () => {
  const { videoList } = useSelector((store) => store.video);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getVideos = async () => {
    try {
      setLoading(true);
      const data = await fetch(YOUTUBE_API);
      const json = await data.json();
      dispatch(addVideos(json.items || []));
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const contentToRender = loading
    ? // Render 12 shimmer cards while loading
      Array.from({ length: 12 }).map((_, index) => (
        // Key isn't critical here since they are placeholders, but good practice
        <ShimmerVideoCard key={index} />
      ))
    : // Render actual video cards once loaded
      videoList?.map((video) => {
        const videoId =
          typeof video.id === "object" ? video.id.videoId : video.id;

        if (!videoId) return null; // Safety check

        return (
          <Link to={"watch?v=" + videoId} key={videoId}>
            <VideoCard info={video} />
          </Link>
        );
      });

  return (
    <div className="w-full p-2 sm:p-4">
      <div
        className="
          grid gap-4 
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
        "
      >
        {contentToRender} 👈 Render the determined content
      </div>
    </div>
  );
};

export default VideoContainer;
