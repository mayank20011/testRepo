import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import blogsRouter from "./routes/blog.js";
import cors from "cors";
import commentsRouter from "./routes/comment.js";
import connectDb from "./config/db.js";

// dotenv path config
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8080;

// initializing server
const server = express();

// body parser middleware
server.use(express.json());
// cors
server.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// to check if server is working or not
server.get("/", (req, res) => {
  res.status(200).send("Hello");
});

server.use("/api/v1/user", userRouter);
server.use("/api/v1/blog", blogsRouter);
server.use("/api/v1/comment", commentsRouter);

connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed To connect to mongodb", err);
    process.exit(1);
  });
