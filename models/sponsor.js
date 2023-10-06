import mongoose from "mongoose";
const sponsorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  abbreviated_name: {
    type: String,
  },
});
export const sponsor = mongoose.model("Sponsor", sponsorSchema);
