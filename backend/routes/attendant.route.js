import express from 'express';
import { registerAttendant, loginAttendant } from '../controllers/attendant.auth.js';

const router = express.Router();

router.post('/register', registerAttendant);
router.post('/login', loginAttendant);

export default router;