import React from "react";
import { useState } from "react";
import CreateBlog from "../components/CreateBlog";
import ReadBlogs from "../components/ReadBlogs";
import UpdateBlogs from "../components/UpdateBlogs";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { name } = useParams();

  const data = ["create-blog", "read-blog", "update-blog"];

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  
  return (
    <div className="w-full h-full flex p-4 sm:p-6 bg-white min-h-screen">
      <div className="w-full flex flex-col gap-6 space-between">
        <div className="flex gap-4">
          <div className="grow flex justify-center items-center gap-2 sm:gap-4">
            {data.map((string, id) => (
              <Link
                key={id}
                to={`/dashboard/${string}`}
                className={`text-sm sm:text-base border px-2 sm:px-4 py-2 rounded-2xl hover:scale-90 transition ${
                  name == string ? "bg-black text-white" : ""
                }`}
              >{`${string.split("-")[0]} Blog`}</Link>
            ))}
          </div>
          <img
            src={userData[0].img}
            alt="User Image"
            width="50px"
            height="50px"
            className="rounded-full h-fit border border-green-600 aspect-square"
          />
        </div>
        <div className="">
          {name == "create-blog" ? (
            <CreateBlog />
          ) : name == "read-blog" ? (
            <ReadBlogs />
          ) : name == "update-blog" ? (
            <UpdateBlogs />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
