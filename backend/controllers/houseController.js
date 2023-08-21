import asyncHandler from 'express-async-handler';
import HouseItem from '../models/houseItemModel.js';

//@desc     Create New House Item
//route     POST /api/house
//@access   Private
const createItem = asyncHandler(async (req, res) => {
    const { name, category, favorite } = req.body;
    const user = req.user._id;

    const itemExists = await HouseItem.findOne({ user: user, name: name });

    if (itemExists) {
        res.status(400);
        throw new Error('Item already exists');
    }

    const item = await HouseItem.create({
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

//@desc     Get All House Items For The User Logged In
//route     GET /api/house
//@access   Private
const getItems = asyncHandler(async (req, res) => {
    const user = req.user._id;

    const userItems = await HouseItem.find({ user: user });

    if (userItems.length === 0) {
        res.status(400);
        throw new Error("User does not have any house items");
    } else {
        res.status(200).json(userItems);
    }
});

//@desc     Update House Item
//route     PUT /api/house/:_id
//@access   Private
//NOTE: this is working by sending the itemId through a path variable in request parameters. Going to need to figure out to how to send these requests through the frontend once created
const updateItem = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const itemId = req.params._id;

    const item = await HouseItem.findOne({ user: user, _id: itemId });

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

//@desc     Delete House Item
//route     DELETE /api/house/:_id
//@access   Private
//NOTE: this is working by sending the itemId through a path variable in request parameters. Going to need to figure out to how to send these requests through the frontend once created
const deleteItem = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const itemId = req.params._id;
    
    const deletedItem = await HouseItem.findOneAndDelete({ user: user, _id: itemId });

    if (deletedItem) {
        res.status(200).json(deletedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

export { 
    createItem,
    getItems,
    updateItem,
    deleteItem
};