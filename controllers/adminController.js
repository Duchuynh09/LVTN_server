import { admins } from "../models/admins.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllAdmins = async (req, res) => {
  // try {
  //   // const ad = await admins.find();
  //   // return res.status(200).json(ad);
  // } catch (error) {
  //   return res.status(500);
  // }
};

const createAdmin = async (req, res) => {
  const newAd = req.body;
  if (newAd.adminKey === process.env.ADMIN_KEY_SIGNUP) {
    try {
      const ad = new admins(newAd);
      await ad.save();
      return res.status(200).json(ad);
    } catch (error) {
      return res.status(500).json({ state: "error" });
    }
  } else {
    return res.status(300).json({ state: "failure" });
  }
};

const compareAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await admins.findOne({ email });

    if (!admin) return res.status(200).json({ state: "failure" });
    // Dịch ngược pass
    const isCorrectPassword = await bcrypt.compare(password, admin.password);

    if (!isCorrectPassword) return res.status(200).json({ state: "failure" });

    const accessToken = jwt.sign(
      {
        role: "admin",
        _id: admin._id,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      state: "success",
      token: accessToken,
      user: {
        email,
        isAdmin: admin.isAdmin,
        level: admin.level,
      },
    });
  } catch (error) {
    return res.status(500);
  }
};

export { getAllAdmins, createAdmin, compareAdmin };
