import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique:true
  },
});



userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10); // creat salt 10 char
    const passwordHashed = await bcrypt.hash(this.password, salt); // passwordHashed + salt
    this.password = passwordHashed; // done
    next();
  } catch (error) {
    next(error);
  }
});



export const users = mongoose.model("graduation_users", userSchema);