import path from "path";

require('dotenv').config()
const {PORT, COOKIE_SECRET, COOKIE_NAME, secretKey} = process.env;
const express = require('express');
const moment = require("moment")
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({url: process.env.REDIS_URL});
// const redisClient = redis.createClient();
const cors = require("cors");
const app = express()
// const morgan = require("morgan");
const authRouter = require('./routes/auth.router')
const userRouter = require('./routes/user.router')
const cardRouter = require('./routes/card.router')
const columnRouter = require('./routes/column.router')
const taskRouter = require('./routes/task.router')
// const checkAuthorization = require('./middlewares/checkAuth')
app.set("cookieName", COOKIE_NAME);
// app.use(morgan("dev"));
app.use(express.json());
app.use(cors(
  {
    origin: ['https://json-statham.com', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
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
      secure: false, //
      // domain: "localhost",
      httpOnly: true, ///
      // sameSite: 'none',
      maxAge: 1e3 * 60*60, // COOKIE'S LIFETIME — 1 HOUR
    },
  })
);

app.use(express.static(path.join(__dirname, "src", "public", "uploads")));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/users", checkAuthorization, userRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/columns", columnRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT}`)
})
