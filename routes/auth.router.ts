const { Router } = require("express");
import { signUp, signIn } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/signup", signUp);
authRouter.get("/signin", signIn);

module.exports = authRouter;

