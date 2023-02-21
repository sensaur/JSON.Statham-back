import { setColumnsOrder } from "../controllers/column.controller";

const { Router } = require("express");
import { getAllTasks , createTask, editTask, getTask, deleteTask, setTasksOrder } from "../controllers/task.controller";

const TasksRouter = Router();

TasksRouter.get("/", getAllTasks);
TasksRouter.post("/", createTask);
TasksRouter.put("/setTasksOrder", setTasksOrder);
TasksRouter.route("/:id").patch(editTask)
TasksRouter.route("/:id").get(getTask)
TasksRouter.route("/:id").delete(deleteTask)

module.exports = TasksRouter;

