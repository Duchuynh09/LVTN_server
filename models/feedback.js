import mongoose from "mongoose";

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export const feedbackModel = mongoose.model("graduation_feedback", schema);
