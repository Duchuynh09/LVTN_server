import express from "express";
import { createUser,compareUser ,getAllLecturer,getAllUser,upLevelUser,delUser,feedBack,getFeedBack} from "../controllers/userController.js";
import {checkAdminToken,checkUserToken} from "../middleware/checkToken.js";

const router = express.Router();

router.post("/signUp", createUser);
router.post("/signIn", compareUser);

router.post("/upLevelUser",checkAdminToken, upLevelUser);

router.get('/getAllUser',checkAdminToken,getAllUser)
router.get('/getAllLecturer',checkAdminToken,getAllLecturer)

router.post('/delUser',checkAdminToken,delUser)

router.post('/feedBack',checkUserToken,feedBack)
router.get('/getFeedBack',checkUserToken,getFeedBack)








export default router;
