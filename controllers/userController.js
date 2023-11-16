import { users } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { feedbackModel } from "../models/feedback.js";
import { tokens } from "../models/token.js";
import { sendEmailVerify } from "./sendMailController.js";
const getAllUser = async (req, res) => {
  try {
    const user = await users.find({ role: "sinhVien", verified: true });
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
    const user = await users.find({ role: "giangVien", verified: true });
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
const getAllNotVertify = async (req, res) => {
  try {
    const user = await users.find({ verified: false });
    const data = user.map((item) => {
      return {
        email: item.email,
        role: item.role,
        createAt: item.createdAt,
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

const compareUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email, verified: true });
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
// Gửi mail
const sendMailVerifiedEmail = async (req, res) => {
  const { password, email } = req.body;

  try {
    let user = await users.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .send({ message: "fail", notification: "Email này đã được sử dụng" });
    user = new users({ password: password, email: email });
    await user.save();
    let token = new tokens({
      userId: user._id,
    });
    await token.save();
    const message = `${
      process.env.BASE_URL || `http://localhost:5000`
    }/user/verify/${user.id}/${token.token}`;
    await sendEmailVerify(
      user.email,
      "Bấm vào link để hoàn thành đăng ký tài khoản", //Tiêu đề mail
      message
    );

    return res.send({
      message: "success",
      notification:
        "tôi đã gửi email để kích hoạt tài khoản cho bạn! Vui lòng xác nhận để đăng nhập",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "fail", notification: "Đã xảy ra loi" });
  }
};

const verifiedEmail = async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");
    const token = await tokens.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await users.updateOne({ _id: user._id }, { verified: true });
    await tokens.findByIdAndRemove(token._id);

    return res.send("Kích hoạt tài khoản thành công");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const deleteAllNotVertify = async (req, res) => {
  try {
    await users.deleteMany({ verified: false });
    await tokens.deleteMany();
    return res.send({ message: "success" });
  } catch (error) {
    return res.send(error.message);
  }
};
export {
  getAllNotVertify,
  deleteAllNotVertify,
  verifiedEmail,
  sendMailVerifiedEmail,
  getAllIdUsers,
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
