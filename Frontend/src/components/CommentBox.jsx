import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./loader.jsx";

const CommentBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  userData = userData[0];

  function submitComment(e) {
    e.preventDefault();
    if (e.target[0].value == "") {
      toast.error("Enter Comment Before Submiting");
    } else {
      const obj = {
        email: userData.email,
        img: userData.img,
        data: e.target[0].value,
        postId: postId,
      };
      setSubmitLoading(true);
      axios
        .post("https://test-repo-taupe-seven.vercel.app/api/v1/comment/", obj)
        .then((res) => {
          if (res.data.success == true) {
            toast.success("Comment Added Successfully");
            e.target.reset();
            if (comments?.length > 0) {
              setComments([obj, ...comments]);
            } else {
              setComments([obj]);
            }
          } else {
            toast.error(res.data.error);
          }
          setSubmitLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server Problem");
          setSubmitLoading(false);
        });
    }
  }

  useEffect(() => {
    axios
      .get(`https://test-repo-taupe-seven.vercel.app/api/v1/comment/${postId}`)
      .then((res) => {
        setComments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Problem");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center mx-auto">
        Loading Comments <span className="animate-ping">...</span>
      </p>
    );
  }

  return (
    <div className="w-9/10 mx-auto flex flex-col gap-2">
      <h1 className="font-bold">Comments:</h1>
      <div className="flex flex-col gap-2 border max-h-[300px] overflow-y-auto">
        {comments?.length > 0 ? (
          comments.map((data, id) => (
            <div key={id} className="flex flex-col gap-2 p-2 bg-slate-100">
              <div className="flex gap-2 items-center">
                <img
                  src={data.img}
                  alt={`profile pic`}
                  width={30}
                  height={30}
                  className="border rounded-full aspect-square"
                />
                <p className="text-xs">{data.email}</p>
              </div>
              <p className="text-xs">{data.data}</p>
            </div>
          ))
        ) : (
          <p className="text-red-600 m-2">No Comments On This Post Yet</p>
        )}
      </div>
      <form className="flex flex-col gap-2 grow" onSubmit={submitComment}>
        <h1 className="font-bold">Add Comment</h1>
        <textarea
          type="text"
          placeholder="Enter Comment"
          className="w-full border grow resize-none p-2 sm:p-4 outline-none"
        />
        <button
          type="submit"
          className={`px-2 py-1 border rounded-sm text-white bg-black hover:scale-95 transition cursor-pointer ${submitLoading ? 'opacity-30' : ''}`}
          disabled={submitLoading}
        >
          {submitLoading ? <Loader color={"white"}/> :'Submit Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
