import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type:Boolean,
    default:true
  },
  level:{
    type:String
  },
  eventsJoin:{
    type: Array,
    default: []
  },
  eventsMake:{
    type:Array,
    default: []
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