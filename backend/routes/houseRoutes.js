import express from 'express';
const router = express.Router();
import { 
    createItem,
    getItem,
    updateItem,
    deleteItem
} from '../controllers/houseController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .post(protect, createItem)
    .get(protect, getItem)
    .put(protect, updateItem)
    .delete(protect, deleteItem);

export default router;