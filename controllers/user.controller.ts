import db from "../db/models"
// import fs from "fs";
// const aws = require('aws-sdk');
// aws.config.region = 'us-east-1';

require('dotenv').config()

const getAllUsers = async (req: any, res: any) => {
  try {
    const allUsers = await db.User.findAll({
      attributes: ['id', 'userName', 'email', 'avatar'],
    });
    console.log(allUsers)
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
}

const editUser = async (req: any, res: any) => {
  const {userName, email, id, avatar} = req.body
  try {
      // const s3 = new aws.S3({
      //   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      //   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      // })
      // const imagePath = req.file.path
      // const blob = fs.readFileSync(imagePath)
      // const uploadedImage = await s3.upload({
      //   Bucket: process.env.S3_BUCKET_NAME,
      //   Key: req.file.filename,
      //   Body: blob,
      // }).promise()

    const updatedUser = await db.User.findOne({where: {id}});
    updatedUser.userName = userName;
    updatedUser.email = email;
    updatedUser.avatar = avatar
    await updatedUser.save()
    return res.json("User info updated on server").status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllUsers, editUser }
