import React from "react";

// The base Tailwind class for the animation
const SHIMMER_ANIMATION_CLASS =
  "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200";

const ShimmerVideoCard = () => {
  return (
    <div className="w-full sm:w-80 md:w-60 lg:w-72 flex flex-col gap-2 cursor-wait">
      {/* Thumbnail Placeholder */}
      <div className={`w-full h-40 rounded-lg ${SHIMMER_ANIMATION_CLASS}`}>
        {/* Shimmer effect is applied here */}
      </div>

      {/* Video Info Placeholder */}
      <div className="flex gap-2">
        {/* Channel Avatar Placeholder */}
        <div
          className={`w-10 h-10 rounded-full flex-shrink-0 ${SHIMMER_ANIMATION_CLASS}`}
        >
          {/* Shimmer effect is applied here */}
        </div>

        {/* Video Details Placeholder */}
        <div className="flex-1 flex flex-col pt-1 gap-2">
          {/* Title Line 1 */}
          <div
            className={`h-4 w-11/12 rounded ${SHIMMER_ANIMATION_CLASS}`}
          ></div>
          {/* Title Line 2 */}
          <div className={`h-4 w-3/4 rounded ${SHIMMER_ANIMATION_CLASS}`}></div>
          {/* Metadata line */}
          <div
            className={`h-3 w-1/2 rounded ${SHIMMER_ANIMATION_CLASS} mt-1`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerVideoCard;
