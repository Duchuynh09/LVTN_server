import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export const device = mongoose.model("Device", schema);
