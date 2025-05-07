import mongoose, { Schema } from "mongoose";
const commentsSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Add Email"],
  },
  img: {
    type: String,
    required: [true, "Comments Image is Required"],
  },
  data: {
    type: String,
    required: [true, "Enter Comment Data"],
    trim: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Post Id is Required"],
  },
});

const comment = mongoose.model("comment", commentsSchema);

export default comment;
