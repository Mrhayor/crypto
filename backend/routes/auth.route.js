import express from "express";
import {signup, logout, login} from "../controllers/controller.js";

const router = express.Router();

router.post("/signUp", signup);
router.get("/logout", logout);
router.post("/login", login);

export default router;