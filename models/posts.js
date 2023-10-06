import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    event: {
      type: mongoose.Types.ObjectId,
      ref: "graduation_events",
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: Object,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "graduation_users",
    },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("Posts", schema);
