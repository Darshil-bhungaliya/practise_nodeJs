import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";
import {verify} from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/login").post(login );

router.route("/register").post(register);
router.route("/logout").post(verify,logout);

export default router;
