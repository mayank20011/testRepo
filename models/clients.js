import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please Add email"],
  },
  pass: {
    type: String,
    trim: true,
    required: [true, "Please Enter password"],
  },
  img: {
    type: String,
    trim: true,
    required: [true, "Enter Image Url"],
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

const user = mongoose.model('user',userSchema);
export default user;
