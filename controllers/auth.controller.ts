const bcrypt = require("bcrypt");
const {User} = require("../models/user");
require('dotenv').config()

const signUp = async (req: any, res: any) => {
  try {
    const {userName, password, email, role, isAdmin, userBankId} = req.body;
    if (userName && password && email) {
      try {
        const hashPassword = await bcrypt.hash(password, process.env.saltRounds);
        const newUser = await User.create(
          {
            userName,
            password: hashPassword,
            email,
            isAdmin,
            role,
            user_bank_id: userBankId
          },
          {
            returning: true,
            plain: true,
          }
        );
        return res.sendStatus(200);
      } catch (error: any) {
        console.log(error.name)
        return res.sendStatus(500);
      }
    }
  }
  catch (error: any) {
    console.log(error.name)
  }
  return res.sendStatus(400);
};

const signIn = async (req: any, res: any) => {
  console.log(req)
  return res.sendStatus(200);
};


export { signUp, signIn }
