import React from "react";
import { useLocation, useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";

const ReadFullBlog = () => {
  const params = useParams();
  const location = useLocation();
  const data = location.state || {};
  const { id } = params;

  return (
    <div className="flex w-full min-h-screen py-6 items-center justify-center">
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex flex-col gap-6 border w-9/10 sm:w-4/5 mx-auto p-2 :md:p-4 rounded-2xl max-w-[500px]">
          <img src={data.img} alt={"image"} className="w-full aspect-square bg-black" />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">{data.title}</h1>
            <p className="overflow-hidden">{data.pera}</p>
          </div>
        </div>
        <CommentBox postId={id}/>
      </div>
    </div>
  );
};

export default ReadFullBlog;
