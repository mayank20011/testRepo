import user from "../models/clients.js";

export function getUser(req, res) {
  const obj = req.body;
  user
    .find(obj)
    .then((data) => {
      if (data.length == 0) {
        res.status(200).json({
          success:false,
          error:"No Suct User",
        })
      } else {
        res.status(200).json({
          success: true,
          data: data,
          length: data.length,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Server Problem",
      });
    });
}

export function postUser(req, res) {
  const obj = req.body;

  user.find({ email: obj.email }).then((data) => {
    if (data.length != 0) {
      res.status(200).json({
        success: false,
        error: "Email Already Exist",
      });
    } else {
      user
        .create(obj)
        .then((data) => {
          res.status(201).json({
            success: true,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            error: "Server Problem",
          });
        });
    }
  });
}
