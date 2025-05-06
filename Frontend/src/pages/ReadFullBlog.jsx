import React from "react";
import { useLocation } from "react-router-dom";
import comments from "../components/Comments";

const ReadFullBlog = () => {
  const location = useLocation();
  const data = location.state || {};
  return (
    <div className="flex w-full min-h-screen py-6 items-center justify-center">
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex flex-col gap-6 border w-9/10 sm:w-4/5 mx-auto p-2 :md:p-4 rounded-2xl max-w-[500px]">
          <img src={data.img} alt={"image"} className="w-full aspect-square" />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">{data.title}</h1>
            <p className="overflow-hidden">
              {data.pera}
            </p>
          </div>
        </div>
        {/* <div className="w-9/10 mx-auto flex flex-col gap-2">
          <h1 className="font-bold">Comments:</h1>
          <div className="flex flex-col gap-2 border max-h-[300px] overflow-y-auto">
            {comments.map((data, id) => (
              <div key={id} className="flex flex-col gap-2 p-2 bg-slate-100">
                <div className="flex gap-2 items-center">
                  <img
                    src={data.img}
                    alt={`profile pic`}
                    width={30}
                    height={30}
                    className="border rounded-full"
                  />
                  <p className="text-xs">{data.email}</p>
                </div>
                <p className="text-xs">{data.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 grow">
            <h1 className="font-bold">Add Comment</h1>
            <textarea
              type="text"
              placeholder="Enter Comment"
              className="w-full border grow resize-none"
            />
            <button className="text-xs px-2 py-1 border rounded-sm text-white bg-black hover:scale-95 transition cursor-pointer">
              Submit Comment
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReadFullBlog;
