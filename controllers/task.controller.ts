import db from "../db/models"

const {v4: uuidv4} = require('uuid');

require('dotenv').config()

const getAllTasks = async (req: any, res: any) => {
  try {
    const allTasks = await db.Task.findAll({
      attributes: ['id', 'taskTitle', 'order'],
    });
    return res.json(allTasks);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const createTask = async (req: any, res: any) => {
  if (req.session?.user?.id === undefined) return res.json("надо бы авторизоваться").status(401)
  const id = uuidv4();
  const {taskTitle, order, column_id} = req.body;
  try {
    const newTask = await db.Task.create({
      taskTitle,
      order,
      // user_id: req.session.user.id,
      id,
      column_id
    });
    return res.json(newTask);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const editTask = async (req: any, res: any) => {
  const {taskTitle, order} = req.body
  const {id} = req.params
  try {
    const updatedTask = await db.Task.findOne({where: {id: id}});
    await updatedTask.update({taskTitle, order})
    return res.json("Task info updated on server").status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const getTask = async (req: any, res: any) => {
  const {id} = req.params
  try {
    const task = await db.Task.findOne({
      where: {id: id},
      attributes: ['taskTitle', 'id', 'order']
    });
    return res.json(task).status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const deleteTask = async (req: any, res: any) => {
  const {id} = req.params
  try {
    await db.Task.destroy({where: {id: id}})
    return res.json("Task Deleted").status(204);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllTasks, editTask, createTask, getTask, deleteTask }
