import db from "../db/models"

const {v4: uuidv4} = require('uuid');

require('dotenv').config()

const getAllColumns = async (req: any, res: any) => {
  try {
    const allTasks = await db.Column.findAll({
      attributes: ['id', 'columnTitle', 'order'],
    });
    return res.json(allTasks);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const createColumn = async (req: any, res: any) => {
  if (req.session?.user?.id === undefined) return res.json("надо бы авторизоваться").status(401)
  const id = uuidv4();
  const {columnTitle, order, card_id} = req.body;
  try {
    const newColumn = await db.Column.create({
      columnTitle,
      order,
      user_id: req.session.user.id,
      id,
      card_id
    });
    return res.json(newColumn);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const editColumn = async (req: any, res: any) => {
  const {columnTitle, order} = req.body
  const {id} = req.params
  try {
    const updatedBoard = await db.Column.findOne({where: {id: id}});
    await updatedBoard.update({columnTitle, order})
    const updatedBoard2 = await db.Column.findOne({where: {id: id}, raw: true});
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
      where: {id: id},
      attributes: ['columnTitle', 'id', 'order'],
      include: [{
        model: db.Task,
        where: {column_id: id},
        attributes: ['taskTitle', 'order', 'id']
      }],
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
    await db.Column.destroy({where: {id: id}})
    return res.json("Column Deleted").status(204);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllColumns, editColumn, createColumn, getColumn, deleteColumn }
