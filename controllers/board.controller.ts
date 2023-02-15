import db from "../db/models"

require('dotenv').config()

const getAllBoards = async (req: any, res: any) => {
  console.log(req.session.user.id)
  try {
    const allBoards = await db.Board.findAll({
      attributes: ['boardUUID', 'boardTitle', 'order', 'color'],
      include: [{
        model: db.User,
        where: {id: req.session.user.id},
        attributes: ['userName', 'userUUID']
      }],
      // raw: true
    });
    // console.log(allBoards)
    return res.json(allBoards);
  } catch (error) {
    return res.sendStatus(500);
  }
}

const editBoard = async (req: any, res: any) => {
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

export { getAllBoards, editBoard }
