import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setForm }) => {
  const navigate = useNavigate();
  const [reqState, setReqState] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      email: e.target[0].value,
      pass: e.target[1].value,
    };
    if (e.target[0].value == " " || e.target[1].value == "") {
      toast.error("Both Fields Are Mendatory");
    } else {
      if (e.target[1].value.length < 6) {
        toast.error("Wrong Password");
      } else {
        setIsDisable(true);
        setReqState(true);
        axios
          .post(
            "https://test-repo-taupe-seven.vercel.app/api/v1/user",
            obj
          )
          .then((res) => {
            setIsDisable(false);
            setReqState(false);
            if(res.data.success == true){
              sessionStorage.setItem("userData",JSON.stringify(res.data.data));
              navigate("/dashboard/create-blog");
            }
            else{
              toast.error(`${res.data.error}`);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Server Problem while Login");
            setIsDisable(false);
            setReqState(false);
          });
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-9/10 mx-auto sm:w-4/5 max-w-[500px] bg-slate-100 rounded-2xl p-4 sm:p-6"
    >
      <h1 className="text-2xl font-bold">Login</h1>
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
      <button
        type="submit"
        className="border rounded-sm hover:scale-95 transition py-2 cursor-pointer flex text-center gap-2 w-full justify-center items-center"
        disabled={isDisable}
      >
        {reqState ? (
          <p className="p-2 border rounded-full border-l-0 border-t-0 animate-spin"></p>
        ) : (
          <p>Login Account</p>
        )}
      </button>
      <p
        className="text-blue-600 underline underline-offset-4 self-end cursor-pointer hover:scale-95 transition"
        onClick={() => {
          setForm("signUp");
        }}
      >
        New User Creat a account?
      </p>
    </form>
  );
};

export default Login;
