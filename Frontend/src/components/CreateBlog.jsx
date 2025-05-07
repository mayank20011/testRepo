import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./loader";
const CreateBlog = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [isImgLoaded, setisImgLoaded] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "First_time_using_clodinary");
    data.append("cloud_name", " dvpzwwrcd");
    axios
      .post("https://api.cloudinary.com/v1_1/dvpzwwrcd/image/upload", data)
      .then((res) => {
        setImgUrl(res.data.url);
        setisImgLoaded(true);
      })
      .catch((err) => {
        toast.error("Something Went Wrong While Uploading Image");
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const obj = {
      title: e.target[0].value,
      pera: e.target[1].value,
      img: imgUrl,
      createdBy: userData[0]._id,
    };
    if (obj.title == "" || obj.description == "" || obj.img == "") {
      toast.error("All Fields are Mandatory");
    } else {
      setFormSubmit(true);
      axios.post("https://test-repo-taupe-seven.vercel.app/api/v1/blog",obj)
      .then((res)=>{
        if(res.data.success==true){
           toast.success("Blog Created SuccessFully");
           e.target.reset();
        }
        else{
          toast.error(`${res.data.error}`);
        }
        setFormSubmit(false);
      })
      .catch((error)=>{
        console.log(error);
        toast.error('Server Problem');
        setFormSubmit(false);
      })
    }
  }

  return (
    <form
      className="flex flex-col gap-4 w-9/10 mx-auto md:w-4/5 max-w-[500px]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl text-center">Create Blogs</h1>
      <div className="flex flex-col gap-2">
        <h1>Enter Blog Title :-</h1>
        <input
          type=""
          placeholder="Blog Title ..."
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1>Enter Blog Description :-</h1>
        <textarea
          type=""
          placeholder="What's in Your Mind, Huh ? ..."
          className="p-2 border rounded-md resize-none h-[400px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1>Upload Image :</h1>
        <input
          type="file"
          accept="image/*"
          className="p-2 border rounded-md w-fit cursor-pointer"
          onChange={handleImageUpload}
        />
        {imgUrl != "" ? (
          <img src={imgUrl} className="w-[50px] h-[50px]" />
        ) : null}
      </div>
      <button
        type="submit"
        className={`border px-4 py-2 rounded bg-black text-white hover:scale-95 transition cursor-pointer ${formSubmit? 'opacity-30':''}`}
        disabled={formSubmit}
      >
        {formSubmit? <Loader color={"white"}/>:'Create Post'}
      </button>
    </form>
  );
};

export default CreateBlog;
