import express from "express";
const router = express.Router();
import { create, edit, move} from "../controllers/tableItems.js";


router.post('/create', create)
router.post('/edit', edit)
router.post('/move', move)

export {router}
