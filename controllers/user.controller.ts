import db from "../db/models"

require('dotenv').config()

const getAllUsers = async (req: any, res: any) => {
  try {
    const allUsers = await db.User.findAll({
      attributes: ['id', 'userName', 'email'],
    });
    console.log(allUsers)
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
}

const editUser = async (req: any, res: any) => {
  const {userName, email, id} = req.body
  try {
    const updatedUser = await db.User.findOne({where: {id}});
    updatedUser.userName = userName;
    updatedUser.email = email;
    await updatedUser.save()
    return res.json("User info updated on server").status(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { getAllUsers, editUser }
