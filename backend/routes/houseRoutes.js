import express from 'express';
const router = express.Router();
import { 
    createItem,
    getItems,
    updateItem,
    deleteItem
} from '../controllers/houseController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .post(protect, createItem)
    .get(protect, getItems)
    
router.route('/:_id')
    .put(protect, updateItem)
    .delete(protect, deleteItem);

export default router;