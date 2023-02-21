const { Router } = require("express");
import {
  getAllColumns,
  createColumn,
  editColumn,
  getColumn,
  deleteColumn,
  setColumnsOrder
} from "../controllers/column.controller";

const ColumnsRouter = Router();

ColumnsRouter.get("/", getAllColumns);
ColumnsRouter.post("/", createColumn);
ColumnsRouter.put("/setColumnsOrder", setColumnsOrder);
ColumnsRouter.route("/:id").patch(editColumn)
ColumnsRouter.route("/:id").get(getColumn)
ColumnsRouter.route("/:id").delete(deleteColumn)

module.exports = ColumnsRouter;

