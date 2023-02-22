import db from "../db/models"

const {v4: uuidv4} = require('uuid');

require('dotenv').config()

const getAllTasks = async (req: any, res: any) => {
  try {
    const allTasks = await db.Task.findAll({
      attributes: ['id', 'taskTitle', 'order', 'isDone', 'taskDescription'],
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
  const {taskTitle, order, column_id, isDone, taskDescription} = req.body;
  try {
    const newTask = await db.Task.create({
      taskTitle,
      order,
      isDone,
      taskDescription,
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
  const {taskTitle, order, isDone, taskDescription} = req.body
  const {id} = req.params
  try {
    const updatedTask = await db.Task.findOne({where: {id: id}});
    await updatedTask.update({taskTitle, order, isDone, taskDescription})
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
      attributes: ['taskTitle', 'id', 'order', 'isDone', 'taskDescription']
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

const setTasksOrder = async (req: any, res: any) => {
  const array = req.body
  console.log(array)
  try {
    for (let i = 0; i < array.length; i++) {
      const entry = await db.Task.findOne({where: {id: array[i].taskId}});
      await entry.update({order: array[i].order, column_id: array[i].columnId })
    }
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { getAllTasks, editTask, createTask, getTask, deleteTask, setTasksOrder }
