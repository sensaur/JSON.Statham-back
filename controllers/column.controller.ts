import db from "../db/models"

const {v4: uuidv4} = require('uuid');

require('dotenv').config()

const getAllColumns = async (req: any, res: any) => {
  try {
    const allColumns = await db.Column.findAll({
      attributes: ['columnUUID', 'columnTitle', 'order'],
      // include: [{
      //   model: db.User,
      //   attributes: ['userName', 'userUUID']
      // }],
    });
    return res.json(allColumns);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const createColumn = async (req: any, res: any) => {
  const columnUUID = uuidv4();
  const {columnTitle, order} = req.body;
  try {
    const newColumn = await db.Column.create({
      columnTitle,
      order,
      user_id: req.session.user.id,
      columnUUID,
    });
    return res.json(newColumn);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const editColumn = async (req: any, res: any) => {
  const {columnTitle} = req.body
  const {id} = req.params
  try {
    const updatedBoard = await db.Column.findOne({where: {columnUUID: id}});
    await updatedBoard.update({columnTitle})
    const updatedBoard2 = await db.Column.findOne({where: {columnUUID: id}, raw: true});
    console.log(updatedBoard2)
    return res.json("Column info updated on server").status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const getColumn = async (req: any, res: any) => {
  const {id} = req.params
  try {
    const column = await db.Column.findOne({
      where: {columnUUID: id},
      attributes: ['columnTitle', 'columnUUID', 'order']
    });
    return res.json(column).status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const deleteColumn = async (req: any, res: any) => {
  const {id} = req.params
  try {
    await db.Column.destroy({where: {columnUUID: id}})
    return res.json("Column Deleted").status(204);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllColumns, editColumn, createColumn, getColumn, deleteColumn }
