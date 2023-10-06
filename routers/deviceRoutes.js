import express from "express";
import {
  findAll,
  create,
  update,
  findById,
  deleteDevice,
} from "../controllers/deviceController.js";

const router = express.Router();

router.route("/").get(findAll).post(create);

router.route("/:id").get(findById).patch(update).delete(deleteDevice);

export default router;
