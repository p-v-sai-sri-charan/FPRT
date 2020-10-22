import express from "express";
const router = express.Router();
import { get} from "../controllers/user.js";


router.get('/:userId',get)

export {router}
