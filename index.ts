const express = require('express');
const cors = require("cors");
require('dotenv').config()

const app = express()
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({url: process.env.REDIS_URL});
const port = process.env.PORT
const {COOKIE_SECRET, COOKIE_NAME} = process.env;
const authRouter = require('./routes/auth.router')
app.set("cookieName", COOKIE_NAME);
app.use(express.json());
app.use(cors(
  {
    origin: ['https://json-statham.com', 'http://localhost:3000'],
    credentials: true
  }
));
app.use(
  session({
    name: app.get("cookieName"),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore(
      {client: redisClient},
      {secret: COOKIE_SECRET}
    ),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 60*60, // COOKIE'S LIFETIME — 1 DAY
    },
  })
);

app.use("/api/v1/auth", authRouter);
app.listen(port, () => {
  console.log(`Magic happening on port ${port}`)
})
