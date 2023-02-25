import db from "../db/models"
import moment from "moment";

const multer = require("multer");
require('dotenv').config()
import fs from "fs";

const aws = require('aws-sdk');
aws.config.region = 'us-east-1';

const storageConfig = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    const currentTime = new Date()
    const dateForFileName = moment(currentTime.toISOString(), "YYYY-MM-DDTHH-mm-ss").format("YYYY-MM-DD__HH-mm-ss")
    const ext = file.originalname.split(".").pop()
    cb(null, `${dateForFileName}.${ext}`);
  },
});

const upload = multer({storage: storageConfig});

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
  const {userName, email, id} = req.body
  try {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    })
    if (req.file) {
      const imagePath = req.file.path
      const blob = fs.readFileSync(imagePath)
      const uploadedImage = await s3.upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: req.file.filename,
        Body: blob,
      }).promise()

      const updatedUser = await db.User.findOne({where: {id}});
      updatedUser.userName = userName;
      updatedUser.email = email;
      updatedUser.avatar = uploadedImage.Location || 'none'
      await updatedUser.save()
      return res.json("User info updated on server").status(200);
    } else {
      const updatedUser = await db.User.findOne({where: {id}});
      updatedUser.userName = userName;
      updatedUser.email = email;
      await updatedUser.save()
      return res.json("User info updated on server").status(200);
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

export { getAllUsers, editUser, upload }
