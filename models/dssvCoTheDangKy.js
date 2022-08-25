import mongoose from "mongoose";

const schema = mongoose.Schema({
  mssv: {
    type: String,
    require: true,
  },
  maDonVi:{
    type:String,
    require:true
  }
});

export const dssvCoTheDangKyModel = mongoose.model("dssvCoTheDangKy", schema);
