import { Router } from "express";
import {checkrole, verify} from "../middlewares/auth.middlewares.js";
import { deletelist, productadd, updateadd } from "../controllers/product.contollers.js";

const router = Router();

router.use(verify,checkrole);

router.route("/listing").post(productadd);
router.route("/listing/:id").put(updateadd).delete(deletelist);

export default router;
