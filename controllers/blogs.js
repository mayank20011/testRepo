import blog from "../models/blogs.js";

export const getAllBlogs = (req, res) => {
  blog
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        length: data.length,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        error: "Server Problem",
      });
      console.log(err);
    });
};

export const createBlog = (req, res) => {
  const data = req.body;
  blog
    .create(data)
    .then((data) => {
      res.status(201).json({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: false,
        error: "Server problem",
      });
    });
};
