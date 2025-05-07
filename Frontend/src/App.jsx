import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpecificBlog from "./pages/SpecificBlog";
import Home from "./pages/Home";
import ReadFullBlog from "./pages/ReadFullBlog";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/blog/:id" element={<SpecificBlog />} />
            <Route path="/read-full-blog/:id" element={<ReadFullBlog />} />
            <Route path="/dashboard/:name" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
