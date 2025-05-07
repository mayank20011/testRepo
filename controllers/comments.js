import comment from "../models/comments.js";

export const getComments = (req, res) => {
  const id = req.params.id;
  comment
    .find({ postId: id })
    .then((data) => {
      if (data.length == 0) {
        res.status(200).json({
          success: false,
          error: "No Comments Yet",
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
          length: data.length,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "Server problem",
      });
    });
};

export const addComment = (req, res) => {
  const data = req.body;
  comment
    .create(data)
    .then((data) => {
      if (data) {
        res.status(201).json({
          success: true,
          data: data,
        });
      } else {
        res.status(200).json({
          success: false,
          data: "Comment Creating Failed in Db",
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
