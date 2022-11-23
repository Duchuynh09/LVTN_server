import { dssvCoTheDangKyModel } from "../models/dssvCoTheDangKy.js";
import { dssvDaDangKyModel } from "../models/dssvDaDangKy.js";
import {dssv } from '../index.js'
import { sendMail } from "./sendMailController.js";


const getDssvCoTheDangKy = async (req, res) => {
  try {
    const sv = await dssvCoTheDangKyModel.find();
    res.status(200).json(sv);
  } catch (error) { 
    res.status(500);
  }
};

const getDSSV = async (req, res) => {
  try {
    res.status(200).json({ data: dssv });
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
    res.status(200).json({ state: "success" });
  } catch (error) {
    res.status(500).json({ state: "failure" });
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



export {
  getDssvCoTheDangKy,
  getDssvDaDangKy,
  createDssvCoTheDangKy,
  createDssvDaDangKy,
  getDSSV,
};
