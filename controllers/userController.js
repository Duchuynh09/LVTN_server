import { users } from "../models/user.js";
import bcrypt from "bcryptjs";

// const getAllUser = async (req, res) => {
//   try {
//     const user = await users.find();
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500);
//   }
// };

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    const user = new users(newUser);
    await user.save();
    res.status(200).json({email: user.email,message:'success'});
  } catch (error) {
    res.status(500).json({message:'failure'});
  }
};

const compareUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    if (!user) return res.status(200).json({ state: "failure" });
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) return res.status(200).json({ state: "failure" });

    return res.status(200).json({
      state: "success",
      user: {
        email,
      },
    });
  } catch (error) {
    res.status(500);
  }
};

export { createUser, compareUser };
