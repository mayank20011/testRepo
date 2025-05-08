import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBlogs = () => {
  // for fetching data
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [blogId, setBlogId] = useState(-1);
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  function openModal(id) {
    setBlogId(id);
    modalRef.current.classList.remove("hidden");
    setShowModal(true);
  }

  const onDelete = () => {
    axios
      .delete(`https://test-repo-taupe-seven.vercel.app/api/v1/blog/${blogId}`)
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Blog Deleted Successfully");
          const updatedBlogsArray = blogs.filter((item) => item._id != blogId);
          setBlogs(updatedBlogsArray);
        } else {
          toast.error("Server Problem");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong Try Again Later");
      });
  };

  useEffect(() => {
    if (blogs == null) {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData[0]._id;
      axios
        .get(`https://test-repo-taupe-seven.vercel.app/api/v1/blog/${userId}`)
        .then((res) => {
          setBlogs(res.data.data);
          if (res.data.data.length == 0) {
            setEmpty(true);
          } else {
            setEmpty(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error While Fetching Blogs of Specific User");
        });
    }
  }, []);

  if (loading) {
    return (
      <p className="mx-auto">
        Loading <span className="animate-ping">...</span>
      </p>
    );
  }

  return empty == false ? (
    <div>
      {/* For Modal */}
      <div
        className="hidden w-full h-full fixed border z-10 left-0 top-0"
        ref={modalRef}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {showModal ? (
            <Modal
              closeModal={() => {
                modalRef.current.classList.add("hidden");
                setShowModal(false);
              }}
              // setDeleteReqq={setDeleteReq}
              blogId={blogId}
              onDelete={onDelete}
            />
          ) : null}
        </div>
      </div>

      {/* for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-4">
        {blogs.map((data) => (
          <div
            key={data._id}
            className="border p-4 rounded-2xl flex flex-col gap-2 cursor-pointer"
          >
            <img src={data.img} className="w-[100px] h-[100px]" />
            <h1>
              Blog Id: <span className="text-red-600 text-xs">{data._id}</span>
            </h1>
            <h1 className="overflow-hidden">{data.title}</h1>
            <p className="text-sm max-h-[300px] overflow-hidden">{data.pera}</p>
            <div className="flex grow flex-col-reverse">
              <div className="flex gap-2 flex-col sm:flex-row">
                <Link
                  to={`/blog/${data._id}`}
                  state={data}
                  className="text-center text-sm h-fit px-3 py-1 border rounded-2xl bg-red-600 text-white cursor-pointer"
                >
                  Update Blog
                </Link>
                <p
                  className="text-sm h-fit px-3 py-1 rounded-2xl text-white bg-yellow-500 cursor-pointer text-center"
                  onClick={() => {
                    openModal(data._id);
                  }}
                >
                  Delete Blog
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-center mt-12 text-red-600">You Have Not Created Any Blogs Yet !!!</p>
  );
};

export default UpdateBlogs;
