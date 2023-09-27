import express from "express";
import upload from "../middleware/multer.js";
import {
  createPosts,
  findAll,
  findById,
  findByUser,
  deletePost,
  updatePost,
  existPost,
} from "../controllers/postsController.js";

const router = express.Router();

router.route("/").get(findAll).post(upload.single("image"), createPosts);

router
  .route("/:id")
  .get(findById)
  .post(existPost)
  .delete(deletePost)
  .patch(updatePost);

export default router;
