import db from "../db/models"
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const getAllBoards = async (req: any, res: any) => {
  // console.log("123", req.session.user.id)
  try {
    const allBoards = await db.Board.findAll({
      attributes: ['boardUUID', 'boardTitle', 'order', 'color'],
      include: [{
        model: db.User,
        // where: {id: req.session.user.id},
        attributes: ['userName', 'userUUID']
      }],
      // raw: true
    });
    // console.log(allBoards)
    return res.json(allBoards);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const createBoard = async (req: any, res: any) => {
  // console.log(req.session.user.id)
  const boardUUID = uuidv4();
  const {boardTitle, order, color} = req.body;
  try {
    const newBoard = await db.Board.create({
      boardTitle,
      order,
      color,
      user_id: req.session.user.id,
      boardUUID
    });
    return res.json(newBoard);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const editBoard = async (req: any, res: any) => {
  console.log("333")
  const {boardTitle} = req.body
  const {id} = req.params
  try {
    const updatedBoard = await db.Board.findOne({where: {boardUUID: id}});
    await updatedBoard.update({boardTitle})
    return res.json("Board info updated on server").status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const getBoard = async (req: any, res: any) => {
  const {id} = req.params
  try {
    const board = await db.Board.findOne({where: {boardUUID: id},
    attributes:['boardTitle', 'boardUUID', 'order' , 'color']});
    return res.json(board).status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const deleteBoard = async (req: any, res: any) => {
  const {id} = req.params
  try {
    await db.Board.destroy({where: {boardUUID: id}})
    return res.json("Board Deleted").status(204);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllBoards, editBoard, createBoard, getBoard, deleteBoard }
