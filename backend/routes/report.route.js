import express from 'express';
import { getReports, createReport, updateReport } from '../controllers/report.js';
import authMiddleware from '../middlewares/authentication.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware, getReports);
router.post('/', authMiddleware, upload.single('image'), createReport);
router.patch('/:id', authMiddleware, upload.single('image'), updateReport);

export default router;