const { Router } = require("express");
import { getAllColumns , createColumn, editColumn, getColumn, deleteColumn } from "../controllers/column.controller";

const TasksRouter = Router();

TasksRouter.get("/", getAllColumns);
TasksRouter.post("/", createColumn);
TasksRouter.route("/:id").patch(editColumn)
TasksRouter.route("/:id").get(getColumn)
TasksRouter.route("/:id").delete(deleteColumn)

module.exports = TasksRouter;

