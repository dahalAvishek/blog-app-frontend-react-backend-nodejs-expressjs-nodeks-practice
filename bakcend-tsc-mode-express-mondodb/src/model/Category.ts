import mongoose, { ObjectId } from "mongoose";

export interface CategoryI {
  name: string;
  blogs: ObjectId[];
}

const Schema = mongoose.Schema;

const categorySchema = new Schema<CategoryI>({
  name: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  ],
});

export default mongoose.model("Category", categorySchema);
