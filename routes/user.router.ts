const { Router } = require("express");
import { getAllUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);

module.exports = userRouter;

