import mongoose from "mongoose";

const schema = mongoose.Schema({
  type: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  // Sinh viên đăng kí sẽ vào đây
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
  sortDssv: {
    type: Object,
    default: {
      az: true,
      type: "mssv",
    },
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

export const eventModel = mongoose.model("graduation_events", schema);
