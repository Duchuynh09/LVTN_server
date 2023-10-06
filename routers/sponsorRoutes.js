import express from "express";
import {
  findAll,
  create,
  update,
  findById,
  deleteSponsor,
} from "../controllers/sponsorController.js";

const router = express.Router();

router.route("/").get(findAll).post(create);

router.route("/:id").get(findById).patch(update).delete(deleteSponsor);

export default router;
