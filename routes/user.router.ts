const { Router } = require("express");
import { getAllUsers , editUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.route("/:id").patch(editUser)

module.exports = userRouter;

