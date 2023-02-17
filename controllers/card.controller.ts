import db from "../db/models"
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const getAllCards = async (req: any, res: any) => {
  try {
    const allCards = await db.Card.findAll({
      attributes: ['cardUUID', 'cardTitle', 'order', 'color'],
      include: [{
        model: db.User,
        // where: {id: req.session.user.id},
        attributes: ['userName', 'userUUID']
      }],
    });
    return res.json(allCards);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const createCard = async (req: any, res: any) => {
  // console.log(req.session.user.id)
  if(req.session?.user?.id === undefined) return res.json("надо бы авторизоваться").status(401)
  const cardUUID = uuidv4();
  const {cardTitle, order, color} = req.body;
  try {
    const newCard = await db.Card.create({
      cardTitle,
      order,
      color,
      user_id: req.session.user.id,
      cardUUID
    });
    return res.json(newCard);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const editCard = async (req: any, res: any) => {
  const {cardTitle} = req.body
  const {id} = req.params
  try {
    const updatedCard = await db.Card.findOne({where: {cardUUID: id}});
    await updatedCard.update({cardTitle})
    return res.json("Card info updated on server").status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const getCard = async (req: any, res: any) => {
  const {id} = req.params
  try {
    const card = await db.Card.findOne({where: {cardUUID: id},
    attributes:['cardTitle', 'cardUUID', 'order' , 'color']});
    return res.json(card).status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const deleteCard = async (req: any, res: any) => {
  const {id} = req.params
  try {
    await db.Card.destroy({where: {cardUUID: id}})
    return res.json("Card Deleted").status(204);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllCards, editCard, createCard, getCard, deleteCard }
