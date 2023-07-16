import mongoose, { ObjectId } from "mongoose";

export interface UserI {
  name: string;
  email: string;
  password: string;
  blogs: ObjectId[];
}

const userSchema = new mongoose.Schema<UserI>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});
export default mongoose.model("User", userSchema);
//stored in mongodb database as users (in plural form)
