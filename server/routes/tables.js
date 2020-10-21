import express from "express";
const router = express.Router();
import { getAll, create, edit, move} from "../controllers/tables.js";


router.get('/:boardId', getAll)
router.post('/create', create)
router.post('/edit', edit)
router.post('/move', move)

export {router}
