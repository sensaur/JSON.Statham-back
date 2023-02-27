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
            userUUID: uuidv4(),
            avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/96be2232163929.567197ac6fb64.png'
          },
          {
            returning: true,
            plain: true,
          }
        );
        return res.json('User registered')
      } catch (error: any) {
        console.log(error)
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
  if (password && email) {
    try {
      const currentUser = await db.User.findOne({where: {email}});
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = {
          id: currentUser.id,
          userName: currentUser.userName,
        };
        return res.json({id: currentUser.id, userName: currentUser.userName, email: currentUser.email, avatar: currentUser.avatar });
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
