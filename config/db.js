import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path:"./config/config.env"});

const connectDb = ()=>{
  return mongoose.connect(process.env.MONGO_URI);
}

export default connectDb;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then((res) => {
//     console.log("Db Connected SuccessFully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
