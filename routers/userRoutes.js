import express from "express";
import {
  createUser,
  compareUser,
  getAllLecturer,
  getAllUser,
  upLevelUser,
  updateProfile,
  delUser,
  feedBack,
  getFeedBack,
  getOneUser,
  getAllIdUsers,
} from "../controllers/userController.js";
import { checkAdminToken, checkUserToken } from "../middleware/checkToken.js";

const router = express.Router();
// Nó thay đổi đường dẫn chứ hông thay đổi phương thức router
router.post("/signUp", createUser);
router.post("/signIn", compareUser);
router.patch("/updateProfile", updateProfile);
router.get('/searchData',getAllIdUsers)

router.post("/upLevelUser", checkAdminToken, upLevelUser);

router.get("/getAllUser", checkAdminToken, getAllUser);
router.get("/getAllLecturer", checkAdminToken, getAllLecturer);

router.post("/delUser", checkAdminToken, delUser);

router.post("/feedBack", checkUserToken, feedBack);
router.get("/getFeedBack", checkUserToken, getFeedBack);

// Router cho 1 người dùng
router.get("/:email", getOneUser);

export default router;
