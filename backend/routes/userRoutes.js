import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  forgotPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);

export default router;
