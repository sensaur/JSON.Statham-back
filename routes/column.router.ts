const { Router } = require("express");
import { getAllColumns , createColumn, editColumn, getColumn, deleteColumn } from "../controllers/column.controller";

const columnsRouter = Router();

columnsRouter.get("/", getAllColumns);
columnsRouter.post("/", createColumn);
columnsRouter.route("/:id").patch(editColumn)
columnsRouter.route("/:id").get(getColumn)
columnsRouter.route("/:id").delete(deleteColumn)

module.exports = columnsRouter;

