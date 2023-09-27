import { postModel } from "../models/posts.js";
import { users } from "../models/user.js";
const createPosts = async (req, res) => {
  try {
    const { title, description, idEvent, user } = req.body;
    const image = req.file;
    const userByEmail = await users.findOne({ email: user });
    if (idEvent && userByEmail._id) {
      if (title && description) {
        const post = await postModel.create({
          title,
          event: idEvent,
          user: userByEmail._id,
          description: description,
          img: image,
        });
        return res.send({ post });
      } else return res.send("không tồn tại title hoặc descipt");
    } else return res.send("không tồn tại idEvent hoặc email");
  } catch (error) {
    return res.send(error.message);
  }
};
const findAll = async (req, res) => {
  try {
    const response = await postModel
      .find({})
      .populate("user", ["name", "email"])
      .populate("event", ["name", "time", "date", "dsDaDangKy"]);
    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postModel.findById(id);
    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
};
const findByUser = async (req, res) => {
  const { user } = req.body;
  try {
    const response = await postModel.find({ user: user });
    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
};
const existPost = async (req, res) => {
  try {
    const idEvent = req.params.id;
    const response = await postModel.findOne({ event: idEvent });
    return res.send(response);
  } catch (err) {
    res.send({ message: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await postModel.findOneAndDelete({ _id: id });
    res.send({ message: "success", response });
  } catch (error) {
    res.send(error.message);
  }
};
const updatePost = async (req, res) => {
  try {
    res.send("update");
  } catch (error) {}
};
export {
  createPosts,
  findAll,
  findById,
  findByUser,
  deletePost,
  updatePost,
  existPost,
};
