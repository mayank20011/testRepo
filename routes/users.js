import express from "express";
import { getUser, postUser } from "../controllers/client.js";

const userRouter = express.Router();

userRouter.route("/")
.post(getUser)

userRouter.route("/create-user")
.post(postUser);


export default userRouter;
