import express from "express";
import { getComments, addComment } from "../controllers/comments.js";
const commentsRouter =express.Router();

commentsRouter.route("/:id")
.get(getComments)

commentsRouter.route("/")
.post(addComment);

export default commentsRouter;