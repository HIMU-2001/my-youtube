import React from "react";
import { CHANNEL_LOGO } from "../utils/constant";

const VideoCard = ({ info }) => {
  //   console.log(info);

  return (
    <div className="w-full sm:w-80 md:w-60 lg:w-72 flex flex-col gap-2 cursor-pointer">
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-300 rounded-lg overflow-hidden">
        <img
          src={info?.snippet?.thumbnails?.high?.url}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Info */}
      <div className="flex gap-2">
        {/* Channel Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
          <img
            src={CHANNEL_LOGO}
            alt="Channel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Video Details */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold line-clamp-2">
            {info?.snippet?.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {info?.snippet?.channelTitle} •{" "}
            {info?.statistics?.viewCount / 1000 + "K"} •{" "}
            {Math.floor(
              (new Date() - new Date(info?.snippet?.publishedAt)) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
