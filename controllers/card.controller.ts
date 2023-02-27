import db from "../db/models"

const {v4: uuidv4} = require('uuid');

require('dotenv').config()

const getAllCards = async (req: any, res: any) => {
  try {
    const allCards = await db.Card.findAll({
      attributes: ['id', 'cardTitle', 'order', 'color'],
      include: [{
        model: db.User,
        where: {id: req.session.user.id},
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
  if (req.session?.user?.id === undefined) return res.json("надо бы авторизоваться").status(401)
  const id = uuidv4();
  const {cardTitle, order, color} = req.body;
  try {
    const newCard = await db.Card.create({
      cardTitle,
      order,
      color,
      user_id: req.session.user.id,
      id,
    });
    return res.json(newCard);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const editCard = async (req: any, res: any) => {
  const {cardTitle, order} = req.body
  const {id} = req.params
  try {
    const updatedCard = await db.Card.findOne({where: {id: id}});
    await updatedCard.update({cardTitle, order})
    return res.json("Card info updated on server").status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const getCard = async (req: any, res: any) => {
  const {id} = req.params
  try {
    const card = await db.Card.findOne({
      where: {id: id},
      attributes: ['cardTitle', 'id', 'order', 'color'],
      include: [{
        model: db.Column,
        where: {card_id: id},
        attributes: ['columnTitle', 'order', 'id']
      }],
    });
    const emptyCard = await db.Card.findOne({
      where: {id: id},
      attributes: ['cardTitle', 'id', 'order', 'color'],
      raw: true
    })
    emptyCard.Columns = []
    return res.json(card || emptyCard).status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

const deleteCard = async (req: any, res: any) => {
  const {id} = req.params
  try {
    await db.Card.destroy({where: {id: id}})
    return res.json("Card Deleted").status(204);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllCards, editCard, createCard, getCard, deleteCard }
