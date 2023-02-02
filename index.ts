const express = require('express');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;
const authRouter = require('./routes/auth.router')
// import db from './models';
// import { users } from './seeders/users';

// const createUsers = () => {
//   users.map(user => {
//     db.User.create(user)
//   })
// }
//
// createUsers()

// db.sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Magic happening on port ${port}`)
//   })
// }

app.use("/api/v1/auth", authRouter);
app.listen(port, () => {
  console.log(`Magic happening on port ${port}`)
})
