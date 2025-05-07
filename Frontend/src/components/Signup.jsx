import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

const Signup = ({ setForm }) => {
  // for image upload and url
  const [isImgLoaded, setisImgLoaded] = useState(null);

  // for img url once the image is created
  const [imgUrl, setImgUrl] = useState("");

  // to test whats the status of req
  const [reqState, setReqState] = useState(false);

  // for dissabling button
  const [isDisable, setIsDisable] = useState(false);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "First_time_using_clodinary");
    data.append("cloud_name", " dvpzwwrcd");
    setisImgLoaded(false);
    axios
      .post("https://api.cloudinary.com/v1_1/dvpzwwrcd/image/upload", data)
      .then((res) => {
        setImgUrl(res.data.url);
        setisImgLoaded(true);
      })
      .catch((err) => {
        toast.error("Something Went Wrong While Uploading Image");
        console.log(err);
        setisImgLoaded(true);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    const passCheck = e.target[2].value;
    const img = imgUrl;
    if (email == "" || pass == "" || passCheck == "" || img == "") {
      toast.error("All Fields Are Mendatory");
    } else {
      if (pass != passCheck) {
        toast.error("Pass And Confirmation PassWord Not Matching");
      } else {
        if (pass.length < 6) {
          toast.error("Pass Must Be Greater Then 6 Digits");
        } else {
          setIsDisable(true);
          setReqState(true);
          axios
            .post(
              "https://test-repo-taupe-seven.vercel.app/api/v1/user/create-user",
              {
                email: e.target[0].value,
                pass: e.target[1].value,
                img: imgUrl,
              }
            )
            .then((res) => {
              if (res.data.success == true) {
                console.log(res.data.data);
                toast.success("User Created Successfully");
                e.target.reset();
                isImgLoaded(false);
                setForm("login");
              } else {
                toast.error(`${res.data.error}`);
              }
              setIsDisable(false);
              setReqState(false);
            })
            .catch((err) => {
              toast.error("Server Issue");
              console.log(err);
              setIsDisable(false);
              setReqState(false);
            });
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-9/10 mx-auto sm:w-4/5 max-w-[500px] bg-slate-100 rounded-2xl p-4 sm:p-6"
    >
      <h1 className="text-2xl font-bold">Lets Get Your account set up</h1>
      <div className="flex w-full flex-col gap-2">
        <h1>Email :</h1>
        <input
          type="email"
          placeholder="Enter Email ..."
          className="border rounded-sm p-2 w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <h1>Enter Password :</h1>
        <input
          type="password"
          placeholder="Enter Password ..."
          className="border rounded-sm p-2 w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <h1>Enter password :</h1>
        <input
          type="password"
          placeholder="Enter Password again ..."
          className="border rounded-sm p-2 w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <h1>Upload Image :</h1>
        <input
          type="file"
          accept="image/*"
          className="border w-fit p-2"
          onChange={handleImageUpload}
        />
        {isImgLoaded == true ? (
          <img
            src={imgUrl}
            alt="uploaded Image"
            className="w-[50px] h-[50px]"
          />
        ) : null}
        {isImgLoaded == false ? <Loader color={"black"} /> : null}
      </div>
      <button
        type="submit"
        className={`border rounded-sm hover:scale-95 transition py-2 cursor-pointer flex text-center gap-2 w-full justify-center items-center ${
          isDisable ? "opacity-10" : ""
        }`}
        disabled={isDisable}
      >
        {reqState ? <Loader color={"black"} /> : <p>Create Account</p>}
      </button>
      <p
        onClick={() => {
          setForm("login");
        }}
        className="text-green-600 underline underline-offset-4 self-end hover:scale-95 transition cursor-pointer"
      >
        Already a User Login ?
      </p>
    </form>
  );
};

export default Signup;
