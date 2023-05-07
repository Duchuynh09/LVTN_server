import mongoose from "mongoose";

const schema = mongoose.Schema({
  email: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
});

export const feedbackModel = mongoose.model("graduation_feedback", schema);
