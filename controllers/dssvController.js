import { dssvCoTheDangKyModel } from "../models/dssvCoTheDangKy.js";
import { dssvDaDangKyModel } from "../models/dssvDaDangKy.js";
import { dssv } from "../index.js";
import {adminAccount} from '../models/adminAccount.js'
const getDssvCoTheDangKy = async (req, res) => {
  try {
    const sv = await dssvCoTheDangKyModel.find();
    res.status(200).json(sv);
  } catch (error) {
    res.status(500);
  }
};

const getAdmin = async (req, res) => {
  try {
    const sv = await adminAccount.find();
    res.status(200).json(sv);
  } catch (error) {
    res.status(500);
  }
};

const getDssvDaDangKy = async (req, res) => {
  try {
    const sv = await dssvDaDangKyModel.find();
    res.status(200).json(sv);
  } catch (error) {
    res.status(500);
  }
};

const createDssvCoTheDangKy = async (req, res) => {
  try {
    dssv.forEach(async (item, index) => {
      const sv = new dssvCoTheDangKyModel({
        mssv: item.mssv,
        maDonVi: item.maDonVi,
      });
      await sv.save();
    });
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const createDssvDaDangKy = async (req, res) => {
  try {
    const newSv = req.body;
    const ds = new dssvDaDangKyModel(newSv);
    await ds.save();
    res.status(200).json(ds);
    // console.log('them vao ds thanh cong');
  } catch (error) {
    // console.log('them ds k thanh cong',error);
    res.status(500);
  }
};

// const updateProduct = async (req,res) => {
//     try {
//         const updateProduct = req.body
//         const product = await productModel.findOneAndUpdate({_id:updateProduct._id},updateProduct,{new:true})
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500)
//     }
// }

export {
  getDssvCoTheDangKy,
  getDssvDaDangKy,
  createDssvCoTheDangKy,
  createDssvDaDangKy,
  getAdmin
};
