const { Router } = require("express");
import { getAllBoards , editBoard } from "../controllers/board.controller";

const boarsRouter = Router();

boarsRouter.get("/", getAllBoards);
boarsRouter.route("/:id").patch(editBoard)

module.exports = boarsRouter;

