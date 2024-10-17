import express from 'express';
import { loan,verifierLoan,getLoans } from '../controllers/loanController.js';

const router = express.Router();

router.post("/",loan);
router.get("/verifyloanRouter/:id",verifierLoan);
router.get("/getAllLoans",getLoans)

export default router