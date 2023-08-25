import express from 'express';
const router = express.Router();
import { 
    createItem,
    getItems,
    updateItem,
    deleteItem,
    swapItem
} from '../controllers/groceryController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .post(protect, createItem)
    .get(protect, getItems)
    
router.route('/:_id')
    .put(protect, updateItem)
    .delete(protect, deleteItem);

router.route('/:_id/swap')
    .post(protect, swapItem);

export default router;