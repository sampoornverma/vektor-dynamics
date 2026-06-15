import { Router } from 'express';
import multer from 'multer';
import authenticationMiddleware from '../middlewares/authentication.js';
import {
	createComplaint,
	deleteComplaint,
	getAllComplaints,
	getComplaintsByCategory,
	getOtherComplaints,
	getUserComplaints,
	resolveComplaint,
	updateComplaint,
} from '../controllers/complaint/complaint.controller.js';

const router = Router();

// use memory storage because controller expects file.buffer
const upload = multer({ storage: multer.memoryStorage() });

// Public
router.get('/all-complaints', getAllComplaints);

// Protected routes (authentication handled here)
router.post('/complaint', authenticationMiddleware, upload.array('images', 5), createComplaint);
router.patch('/complaint', authenticationMiddleware, upload.array('updatedImages', 5), updateComplaint);
router.delete('/complaint', authenticationMiddleware, deleteComplaint);
router.get('/complaint', authenticationMiddleware, getUserComplaints);

router.get('/complaints/others', authenticationMiddleware, getOtherComplaints);
router.get('/complaints/by-category', getComplaintsByCategory);

// Resolve complaint (middleware for role check later)
router.patch('/complaint/resolve', authenticationMiddleware, resolveComplaint);

export default router;