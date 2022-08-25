import mongoose from "mongoose";

const schema = mongoose.Schema({
  mssv: {
    type: String,
    require: true,
  },
  ten: {
    type: String,
    require: true,
  },
  ngaySinh: {
    type: String,
  },
  lop: {
    type: String,
    require: true,
  },
  nghanh: {
    type: String,
    require: true,
  },
  maDonVi:{
    type:String,
    require:true
  }
});

export const dssvDaDangKyModel = mongoose.model("dssvDaDangKy", schema);
