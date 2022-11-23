import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique:true
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin:{
    type:Boolean,
    default:true
  },
  level:{
    type:String
  }
});



adminSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10); // creat salt 10 char
    const passwordHashed = await bcrypt.hash(this.password, salt); // passwordHashed + salt
    this.password = passwordHashed; // done
    next();
  } catch (error) {
    next(error);
  }
});



export const admins = mongoose.model("graduation_admins", adminSchema);