import mongoose, { ObjectId } from "mongoose";

export interface BlogI {
  title: string;
  description: string;
  image: string;
  user: ObjectId;
  categories: ObjectId[];
}

const Schema = mongoose.Schema;

const blogSchema = new Schema<BlogI>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
});

export default mongoose.model("Blog", blogSchema);
