import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import "dotenv/config.js";

const app = express();
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}`);
});
