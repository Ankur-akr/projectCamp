import { Router } from "express";
import {registerUser} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterValidator , userLoginvalidator} from "../validators/index.js";
import { login, logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginvalidator(), validate, login);

//secure route
router.route("/logout").post(verifyJWT, logoutUser);



export default router;

