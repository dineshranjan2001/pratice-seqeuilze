import { Router } from "express";
import {
  createUser,
  deleteAvatar,
  fetchedProfileDetails,
  findById,
  uploadAvatar,
} from "../controllers/User.controller.js";
import { upload } from "../../middlewares/FileUpload.middleware.js";
const router = Router();

router.post("/save-user", createUser);
router.get("/get-user/:userId", findById);
router
  .route("/upload-avatar/:userId")
  .post(upload.single("avatar"), uploadAvatar)
  .put(upload.single("avatar"), uploadAvatar);
//router.post("/upload-avatar/:userId", upload.single("avatar"), uploadAvatar);
router.get("/get-profile-details/:userId", fetchedProfileDetails);
router.delete("/delete-avatar/:userId",deleteAvatar);

export default router;
