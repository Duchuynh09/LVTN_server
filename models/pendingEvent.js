import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  dsDaDangKy: {
    type: Array,
    require: true,
  },
  dsCoTheDangKy: {
    type: Array,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  limit: {
    type: String,
    default: "all",
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  specialSeat: {
    type: Array,
  },
});

export const pendingEventModel = mongoose.model(
  "graduation_pending_events",
  schema
);
