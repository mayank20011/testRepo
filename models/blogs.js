import { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Enter Title"],
  },
  pera: {
    type: String,
    required: [true, "Enter Blog Data"],
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

const blog = user.model("blog",blogSchema);
export default blog;
