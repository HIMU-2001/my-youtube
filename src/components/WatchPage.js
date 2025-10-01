import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { ThumbsUp, Share2, Download, MoreHorizontal } from "lucide-react";
import { CHANNEL_LOGO, YOUTUBE_VIDEO_API } from "../utils/constant";
import CommentsContainer, { CommentList, commet } from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu()); // closes sidebar when watch page is active
    getVideoDetails();
  }, []);

  const getVideoDetails = async () => {
    const data = await fetch(
      YOUTUBE_VIDEO_API +
        videoId +
        "&key=" +
        process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const json = await data.json();
    console.log(json);

    setVideoDetails(json.items[0]);
  };

  if (!videoDetails) return <div className="p-4">Loading...</div>;

  const { snippet, statistics } = videoDetails;

  return (
    <div className="flex flex-col md:flex-row w-full h-full px-4 md:px-8 mt-4">
      {/* Left Section - Video Player + Details */}
      <div className="flex-1 w-full md:w-2/3">
        {/* Video Player */}
        <div className="relative w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-lg md:text-xl font-semibold">{snippet?.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {new Date(snippet?.publishedAt).toLocaleDateString()} •{" "}
            {parseInt(statistics?.viewCount).toLocaleString()} views
          </p>
        </div>

        {/* Channel Info + Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
          {/* Channel Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300">
              <img
                src={CHANNEL_LOGO}
                alt="Channel"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{snippet?.channelTitle}</p>
              <p className="text-xs text-gray-500">Subscribe • 2.3M</p>
            </div>
            <button className="ml-4 px-4 py-1 rounded-full bg-black text-white font-medium hover:bg-gray-900">
              Subscribe
            </button>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
              <ThumbsUp size={18} />{" "}
              {parseInt(statistics?.likeCount).toLocaleString()}
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
              <Share2 size={18} /> Share
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
              <Download size={18} /> Download
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreHorizontal size={20} />
            </button>
          </div> */}
        </div>

        {/* Description Section */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm whitespace-pre-line">
            {showFullDesc
              ? snippet?.description
              : snippet?.description.slice(0, 200) + "..."}
          </p>
          {snippet?.description.length > 200 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-sm font-medium text-gray-600 mt-2 hover:underline"
            >
              {showFullDesc ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Comments Placeholder */}
        <CommentsContainer />
      </div>

      {/* Right Section - Suggested Videos */}
      <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6">
        <LiveChat />
      </div>
    </div>
  );
};

export default WatchPage;
