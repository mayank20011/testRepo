import express from "express";
import { getAllBlogs } from "../controllers/blogs";

const blogsRouter = express.Router();

blogsRouter.route("/")
.get(getAllBlogs)
.post()

blogsRouter.route("/:id")
.get()

blogsRouter.route("/:id")
.patch()
.delete();

export default blogsRouter;