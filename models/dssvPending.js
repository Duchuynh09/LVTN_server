import mongoose from "mongoose";
const dssvPendingSchema = mongoose.Schema({
  idEvent: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  dssv: {
    type: Array,
    required: true,
  },
});

export const dssvPending = mongoose.model("dssv_pending", dssvPendingSchema);
