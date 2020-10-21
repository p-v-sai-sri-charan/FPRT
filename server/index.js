import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import RequireLogin from "./middlewares/RequireLogin.js";

const app = express()

const MONGO_URL = process.env.MONGO_URL



mongoose.set('useFindAndModify', false)

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

import { router as authRouter } from "./routes/auth.js";
import { router as userRouter } from "./routes/user.js";
import { router as boardsRouter } from "./routes/boards.js";
import { router as tableRouter } from "./routes/tables.js";
import { router as tableItemRouter } from "./routes/tableItems.js";


app.use('/api/auth', authRouter)
app.use('/api/user', RequireLogin, userRouter)
app.use('/api/boards', RequireLogin, boardsRouter)
app.use('/api/tables', RequireLogin, tableRouter)
app.use('/api/table-items', RequireLogin, tableItemRouter)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await app.listen(PORT)
    console.log(`Server has been started at ${PORT}`)
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`Mongo connected`)
  } catch (e) {
    throw e
  }
}

start()
