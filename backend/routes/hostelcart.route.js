import { Router } from 'express';
import multer from 'multer';
import authenticationMiddleware from '../middlewares/authentication.js';
import {
	createItem,
	deleteItem,
	getAllItems,
	getItemsByCategory,
	getOtherItems,
	getUserItems,
	updateItem,
} from '../controllers/hostelcart/item.js';
import { getCategories } from '../controllers/hostelcart/category.js';

const router = Router();

// use memory storage because controller expects file.buffer
const upload = multer({ storage: multer.memoryStorage() });

// Public
router.get('/all-items', getAllItems);
router.get('/categories', getCategories);

// Protected routes (authentication handled here)
router.post('/items', authenticationMiddleware, upload.array('images', 5), createItem);
router.patch('/items', authenticationMiddleware, upload.array('updatedImages', 5), updateItem);
router.delete('/items', authenticationMiddleware, deleteItem);
router.get('/items', authenticationMiddleware, getUserItems);

router.get('/items/others', authenticationMiddleware, getOtherItems);
router.get('/items/by-category', getItemsByCategory);

export default router;