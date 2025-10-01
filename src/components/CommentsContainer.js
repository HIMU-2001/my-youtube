import React from "react";
import { commentsData } from "../utils/constant";
import CommentList from "./CommentList";

const CommentsContainer = () => {
  return (
    <div className="max-w-5xl w-full mt-8">
      <h2 className="text-lg font-semibold mb-4">
        {commentsData.flat().length} Comments
      </h2>
      <div className="mb-6">
        <CommentList comments={commentsData} />
      </div>
    </div>
  );
};

export default CommentsContainer;
