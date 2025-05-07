import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-12">
      <p className="text-4xl text-center sm:text-6xl font-bold text-orange-600">
        Page Not Found
      </p>
      <Link
        to={"/"}
        className="px-4 py-2 bg-black text-white rounded-md hover:scale-95 transition"
      >
        Return To Home Page
      </Link>
    </div>
  );
};

export default NotFound;
