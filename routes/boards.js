import express from "express";
const router = express.Router();
import { getAll, create, edit, star} from "../controllers/boards.js";

router.get('/all', getAll)
router.post('/create', create)
router.post('/edit', edit)
router.post('/star', star)

export {router}
