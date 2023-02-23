const bcrypt = require("bcrypt");
import db from "../db/models"

require('dotenv').config()

const signUp = async (req: any, res: any) => {
  try {
    const {password, email, userName} = req.body;
    const {v4: uuidv4} = require('uuid');
    if (password && email) {
      try {
        const hashPassword = await bcrypt.hash(password, Number(process.env.saltRounds));
        const newUser = await db.User.create(
          {
            password: hashPassword,
            email,
            userName,
            userUUID: uuidv4()
          },
          {
            returning: true,
            plain: true,
          }
        );
        // console.log('newUser=>', newUser)
        return res.json('User registered')
      } catch (error: any) {
        // console.log(error)
        return res.sendStatus(500);
      }
    }
  } catch (error: any) {
    console.log(error.name)
  }
  return res.sendStatus(400);
};

const signIn = async (req: any, res: any) => {
  const {password, email} = req.body;
  // console.log(password)
  // console.log(email)
  if (password && email) {
    try {
      const currentUser = await db.User.findOne({where: {email}});
      // console.log("currentUser", currentUser.dataValues)
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = {
          id: currentUser.id,
          userName: currentUser.userName,
        };
        // console.log(req.session.user)
        // console.log(currentUser)
        return res.json({id: currentUser.id, userName: currentUser.userName, email: currentUser.email});
      }
      return setTimeout(() => res.sendStatus(401), 1e3);
    } catch (error) {
      console.log(error)
      return setTimeout(() => res.sendStatus(500), 1e3);
    }
  }
  return res.sendStatus(400);
};


export { signUp, signIn }
