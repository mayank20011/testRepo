import express from "express";
import { getAllBlogs, deleteBlog, createBlog, findSpecificUsersPost , updateBlog} from "../controllers/blogs.js";

const blogsRouter = express.Router();

blogsRouter.route("/")
.get(getAllBlogs)
.post(createBlog)

blogsRouter.route("/:id")
.get(findSpecificUsersPost)

blogsRouter.route("/:id")
.patch(updateBlog)
.delete(deleteBlog);

export default blogsRouter;