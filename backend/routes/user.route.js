import { Router } from 'express';
import { googleLogin } from '../controllers/user.auth.js';
import { updatePhoneNumber } from '../controllers/user.js';
import authenticationMiddleware from '../middlewares/authentication.js';

const router = Router();

router.post('/google-login', googleLogin);
router.patch('/phone-number', authenticationMiddleware, updatePhoneNumber);

export default router;
