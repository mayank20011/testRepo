import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpecificBlog from "./pages/SpecificBlog";
import Home from "./pages/Home";
import ReadFullBlog from "./pages/readFullBlog";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/blog/:id" element={<SpecificBlog />} />
          <Route path="/read-full-blog/:id" element={<ReadFullBlog />} />
          <Route path="/dashboard/:name" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
