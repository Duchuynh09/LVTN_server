import mongoose from "mongoose";
import crypto from "crypto";
const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "graduation_users",
    require: true,
  },
  token: {
    type: String,
  },
});

tokenSchema.pre("save", async function (next) {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    this.token = token; // done
    next();
  } catch (error) {
    next(error);
  }
});

export const tokens = mongoose.model("token", tokenSchema);
