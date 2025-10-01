import React from "react";
import Comment from "./Comment";

export const CommentList = ({ comments }) => {
  return (
    <div className="w-full">
      {comments.map((c, index) => (
        <div key={index} className="my-4">
          <Comment username={c.name} text={c.text} />
          {c.replies?.length > 0 && (
            <div className="ml-6 sm:ml-10 border-l-2 border-gray-200 pl-4">
              <CommentList comments={c.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
