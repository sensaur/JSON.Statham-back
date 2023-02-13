import db from "../models"

require('dotenv').config()

const getAllUsers = async (req: any, res: any) => {
  try {
    const allUsers = await db.User.findAll();
    console.log(allUsers)
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
}


export { getAllUsers }
