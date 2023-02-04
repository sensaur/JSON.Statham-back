const bcrypt = require("bcrypt");
// import User from "../models/";
import db from "../models"
// const db = require('/models')

require('dotenv').config()

const signUp = async (req: any, res: any) => {
  try {
    console.log("123", req.body.email)
    // const {userName, password, email, role, isAdmin, userBankId} = req.body;
    // if (userName && password && email) {
    //   try {
    //     const hashPassword = await bcrypt.hash(password, process.env.saltRounds);
    //     const newUser = await User.create(
    //       {
    //         userName,
    //         password: hashPassword,
    //         email,
    //         isAdmin,
    //         role,
    //         user_bank_id: userBankId
    //       },
    //       {
    //         returning: true,
    //         plain: true,
    //       }
    //     );
    //     return res.sendStatus(200);
    //   } catch (error: any) {
    //     console.log(error.name)
    //     return res.sendStatus(500);
    //   }
    // }
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
        return res.json({id: currentUser.id, name: currentUser.userName});
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
