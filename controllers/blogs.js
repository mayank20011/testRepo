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

export const deleteBlog = (req, res) => {
  const id = req.params.id;
  blog
    .findByIdAndDelete(id)
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          success: false,
          error: "Blog Not Found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      req.status(500).json({
        success: false,
        error: "Server Problem",
      });
    });
};

export const findSpecificUsersPost = (req, res) => {
  const id = req.params.id;
  console.log(id);
  blog
    .find({ createdBy: id })
    .then((data) => {
      console.log(data);
      res.status(200).json({
        success: true,
        length: data.length,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "Server Issue",
      });
    });
};

export const updateBlog = (req, res) => {
  const id = req.params.id;
  const updateBlog = req.body;
  blog
    .findByIdAndUpdate(id, updateBlog, { new: true, runValidators: true })
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          success: false,
          error: "Blog Not Found",
        });
      } else {
        res.status(200).json({
          succes: true,
          data: data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "Server Problem",
      });
    });
};
