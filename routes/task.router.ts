const { Router } = require("express");
import { getAllTasks , createTask, editTask, getTask, deleteTask } from "../controllers/task.controller";

const TasksRouter = Router();

TasksRouter.get("/", getAllTasks);
TasksRouter.post("/", createTask);
TasksRouter.route("/:id").patch(editTask)
TasksRouter.route("/:id").get(getTask)
TasksRouter.route("/:id").delete(deleteTask)

module.exports = TasksRouter;

