import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dsDaDangKy: {
    type: Array,
    required: true,
  },
  dsCoTheDangKy: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
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
  sponsors: [
    {
      _id: false,
      sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sponsor",
      },
    },
  ],
  devices: [
    {
      _id: false,
      device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const pendingEventModel = mongoose.model(
  "graduation_pending_events",
  schema
);
