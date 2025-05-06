import React from 'react'
import { useState } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';

const Home = () => {

  const [form, setForm] = useState("login");
  console.log("Home Page");
  return (
    <div className="w-full min-h-screen bg-neutral-700 flex justify-center items-center">
        {form == "signUp" ? (
          <Signup setForm={setForm} />
        ) : form == "login" ? (
          <Login setForm={setForm} />
        ) : null}
      </div>
  )
}

export default Home