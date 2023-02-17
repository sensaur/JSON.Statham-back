const { Router } = require("express");
import { getAllBoards , editBoard, createBoard, getBoard, deleteBoard } from "../controllers/board.controller";

const boarsRouter = Router();

boarsRouter.get("/", getAllBoards);
boarsRouter.post("/", createBoard);
boarsRouter.route("/:id").patch(editBoard)
boarsRouter.route("/:id").get(getBoard)
boarsRouter.route("/:id").delete(deleteBoard)

module.exports = boarsRouter;

