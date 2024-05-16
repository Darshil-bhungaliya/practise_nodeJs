import { Router } from "express";
import { buyproduct } from "../controllers/product.contollers.js";
import { verify } from "../middlewares/auth.middlewares.js";
const router = Router();

router.use(verify);

router.route("/buyproduct/:id").post(buyproduct);

export default router;
