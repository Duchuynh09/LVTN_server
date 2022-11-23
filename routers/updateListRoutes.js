import express  from "express";
import {updateList}from "../controllers/updateListController.js";

const router = express.Router();

router.post('/',updateList)


export default router