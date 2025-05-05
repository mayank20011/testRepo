import { Schema } from "mongoose";
import mongoose from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Enter Title"],
  },
  pera: {
    type: String,
    required: [true, "Enter Blog Data"],
  },
  img:{
    type:String,
    required:[true, "Enter Image Url"]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Enter Creators Id"],
  },
  comments: {
    type: [{}],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blog = mongoose.model("blog",blogSchema);
export default blog;
