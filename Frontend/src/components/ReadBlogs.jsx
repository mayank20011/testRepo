import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (blogs == null) {
      axios
        .get("https://test-repo-taupe-seven.vercel.app/api/v1/blog")
        .then((res) => {
          setBlogs(res.data.data);
          setLoading(false);
          if(res.data.data.length>0){
            setIsEmpty(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong while fetching blogs data");
        });
    }
  }, []);

  if (loading) {
    return (
      <p>
        Loading <span className="animate-pulse">...</span>
      </p>
    );
  }
  return (
    isEmpty == false ?
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {blogs.map((data) => (
        <div
          key={data._id}
          className="flex flex-col gap-6 border p-4 rounded-2xl cursor-pointer hover:scale-101 transition"
        >
          <img
            src={data.img}
            alt={"blog image"}
            className="w-full aspect-square bg-black"
          />
          <div className="flex flex-col gap-4 grow borderp-2">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-neutral-500 max-h-[100px] overflow-hidden">{data.pera}</p>
            <div className="grow flex flex-col-reverse">
              <Link
                className="h-fit bg-black text-white w-fit px-4 py-2 rounded-2xl text-sm hover:scale-95 transition cursor-pointer"
                to={`/read-full-blog/${data._id}`}
                state={data}
              >
                Read Full Blog
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    :<p className="text-red-600 mx-auto text-center mt-12">No One Has Created Any Blog Yet</p>
  );
};

export default ReadBlogs;
