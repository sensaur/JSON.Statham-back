const { Router } = require("express");
import { getAllUsers , editUser, upload } from "../controllers/user.controller";
const path = require("path");
const cors = require("cors");

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.route("/:id").patch(upload.single("file"), editUser)

module.exports = userRouter;

