const { Router } = require("express");
import { signUp, signIn } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

module.exports = authRouter;

