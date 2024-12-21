import express from 'express';
import { sendScoreToDB } from '../controllers/scoreController.js'; 

const router = express.Router();

router.post('/sendScoreToDB', sendScoreToDB);
export default router;