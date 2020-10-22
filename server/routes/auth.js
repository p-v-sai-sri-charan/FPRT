import express from "express";
const router = express.Router();
import { register,login, updateprofilepic, updatepassword, getdatabyid} from "../controllers/auth.js";
import RequireLogin from "../middlewares/RequireLogin.js";

router.post('/register', register);
router.post('/login', login);
router.post('/updateprofilepic/:id',RequireLogin,updateprofilepic);
router.post('/updatepassword/:id',RequireLogin,updatepassword);
router.get('/getdatabyid/:id',RequireLogin,getdatabyid);
export {router}
