const bcrypt = require("bcrypt");
// import User from "../models/";
import db from "../models"
// const db = require('/models')

require('dotenv').config()

const signUp = async (req: any, res: any) => {
  try {
    // console.log("123", req.body.email)
    const {password, email, userName} = req.body;
    // console.log(process.env.saltRounds)
    // console.log(typeof process.env.saltRounds)
    // console.log(Number(process.env.saltRounds))
    // console.log(typeof Number(process.env.saltRounds))
    if (password && email) {
      try {
        const hashPassword = await bcrypt.hash(password, Number(process.env.saltRounds));
        const newUser = await db.User.create(
          {
            password: hashPassword,
            email,
            userName,
          },
          {
            returning: true,
            plain: true,
          }
        );
        return res.json('Пользователь успешно создан')
        // return res.sendStatus(200);
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
  // console.log("password", password)
  // console.log("email", email)
  if (password && email) {
    try {
      const currentUser = await db.User.findOne({where: {email}});
      // const currentUser = await User.findOne({where: {email}});
      console.log("currentUser", currentUser.dataValues)
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        req.session.user = {
          id: currentUser.id,
          userName: currentUser.userName,
        };
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
