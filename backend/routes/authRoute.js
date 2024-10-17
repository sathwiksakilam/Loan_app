import express from 'express';
import { signup } from '../controllers/authController.js';
import { signin,signout,getUser } from '../controllers/authController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/signout",signout);
router.get("/currentuser",verifyToken, getUser);

export default router