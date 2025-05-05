import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import "./config/db.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8080;

const server = express();

// body parser middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Hello");
});

server.use("/api/v1/user", userRouter);

server.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
