import asyncHandler from 'express-async-handler';
import GroceryItem from '../models/groceryItemModel.js';
import HouseItem from '../models/houseItemModel.js';

//@desc     Create New Grocery Item
//route     POST /api/grocery
//@access   Private
const createItem = asyncHandler(async (req, res) => {
    const { name, category, favorite } = req.body;
    const user = req.user._id;

    const itemExists = await GroceryItem.findOne({ user: user, name: name });

    if (itemExists) {
        res.status(400);
        throw new Error('Item already exists');
    }

    const item = await GroceryItem.create({
        name,
        category,
        favorite,
        user
    });
    
    if (item) {
        res.status(201).json({
            _id: item._id,
            name: item.name,
            category: item.category,
            favorite: item.favorite
        });
    } else {
        res.status(400);
        throw new Error('Invalid item data');
    }
});

//@desc     Get All Grocery Items For The User Logged In
//route     GET /api/grocery
//@access   Private
const getItems = asyncHandler(async (req, res) => {
    const user = req.user._id;

    const userItems = await GroceryItem.find({ user: user });

    if (userItems.length === 0) {
        res.status(400);
        throw new Error("User does not have any grocery items");
    } else {
        res.status(200).json(userItems);
    }
});

//@desc     Update Grocery Item
//route     PUT /api/grocery/:_id
//@access   Private
//NOTE: this is working by sending the itemId through a path variable in request parameters. Going to need to figure out to how to send these requests through the frontend once created
const updateItem = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const itemId = req.params._id;

    const item = await GroceryItem.findOne({ user: user, _id: itemId });

    if (item) {
        item.name = req.body.name || item.name;
        item.category = req.body.category || item.category;
        item.favorite = req.body.favorite || item.favorite;

        const updatedItem = await item.save();

        res.status(200).json({
            _id: updatedItem._id,
            name: updatedItem.name,
            category: updatedItem.category,
            favorite: updatedItem.favorite,
        })
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

//@desc     Delete Grocery Item
//route     DELETE /api/grocery/:_id
//@access   Private
//NOTE: this is working by sending the itemId through a path variable in request parameters. Going to need to figure out to how to send these requests through the frontend once created
const deleteItem = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const itemId = req.params._id;
    
    const deletedItem = await GroceryItem.findOneAndDelete({ user: user, _id: itemId });

    if (deletedItem) {
        res.status(200).json(deletedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

//@desc     Swap Grocery Item To A House Item
//route     POST /api/grocery/:_id/swap
//@access   Private
//NOTE: this is working by sending the itemId through a path variable in request parameters. Going to need to figure out to how to send these requests through the frontend once created
const swapItem = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const itemId = req.params._id;
    
    const item = await GroceryItem.findOne({ user: user, _id: itemId });
    const houseItemExists = await HouseItem.findOne({ user: user, name: item.name});

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    if (houseItemExists) {
        res.status(400);
        throw new Error('Item is already in your house list');
    }

    const newHouseItem = await HouseItem.create({
        name: item.name,
        category: item.category,
        favorite: item.favorite,
        user: item.user
    });

    await GroceryItem.findOneAndDelete({ user: user, _id: itemId });

    res.status(201).json(newHouseItem);
});

export { 
    createItem,
    getItems,
    updateItem,
    deleteItem,
    swapItem
};