import { users } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { feedbackModel } from "../models/feedback.js";

const getAllUser = async (req, res) => {
  try {
    const user = await users.find({ role: "sinhVien" });
    const data = user.map((item) => {
      return {
        email: item.email,
        role: item.role,
      };
    });
    res.status(200).json({ message: "success", data });
  } catch (error) {
    res.status(500);
  }
};
const getOneUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await users.findOne({ email: email });
    const data = {
      name: user.name,
      idClass: user.idClass,
      idUser: user.idUser,
      major: user.major,
      department: user.department,
    };
    res.status(200).json({ message: "success", data });
  } catch (error) {
    res.status(500);
  }
};
const getAllIdUsers = async (req, res) => {
  try {
    const idUsers = await users.find({}, "idUser");
    const arrIdUsers = idUsers
      .filter((user) => user.idUser)
      .map((user) => {
        return { value: user.idUser };
      });

    res.status(200).json({ message: "success", arrIdUsers });
  } catch (error) {
    res.status(200).json({ message: "success", err: error.message });
  }
};
const getAllLecturer = async (req, res) => {
  try {
    const user = await users.find({ role: "giangVien" });
    const data = user.map((item) => {
      return {
        email: item.email,
        role: item.role,
      };
    });
    res.status(200).json({ message: "success", data });
  } catch (error) {
    res.status(500);
  }
};

const upLevelUser = async (req, res) => {
  try {
    const { email } = req.body;
    await users.findOneAndUpdate(
      { email },
      {
        role: "giangVien",
      },
      { new: true }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const { email, idUser, ...data } = req.body;
    const user = await users.findOneAndUpdate(
      { email },
      { idUser: idUser, ...data },
      { new: true }
    );
    res.status(200).json({ user, message: "success" });
  } catch (error) {
    res.status(200).json({ message: error });
  }
};
const delUser = async (req, res) => {
  try {
    const { email } = req.body;
    await users.findOneAndDelete({ email });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new users({
      email,
      password,
    });
    await user.save();
    return res.status(200).json({ email: user.email, message: "success" });
  } catch (error) {
    return res.status(200).json({ message: "Có lỗi" });
  }
};

const compareUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    if (!user) return res.status(200).json({ state: "failure" });
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) return res.status(201).json({ state: "failure" });

    const accessToken = jwt.sign(
      {
        role: user.role,
        _id: user._id,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      state: "success",
      token: accessToken,
      user: {
        email,
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500);
  }
};

const feedBack = async (req, res) => {
  try {
    const { email, feedback } = req.body;
    const newfeedback = new feedbackModel({ email, description: feedback });
    await newfeedback.save();
    return res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(500);
  }
};

const getFeedBack = async (req, res) => {
  try {
    const fb = await feedbackModel.find();

    return res.status(200).json({ state: "success", data: fb });
  } catch (error) {
    return res.status(500);
  }
};

export {
  getAllIdUsers,
  createUser,
  feedBack,
  compareUser,
  getAllLecturer,
  getAllUser,
  upLevelUser,
  getFeedBack,
  delUser,
  updateProfile,
  getOneUser,
};
