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
//route     PUT /api/house
//@access   Private
const updateItem = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const itemId = req.body._id;

    const item = await HouseItem.find({ user: user, _id: itemId });

    res.status(200).json(item);
    //GOT EVERYTHING ABOVE THIS WORKING TO FIND THE SPECIFIC ITEM NEEDED TO UPDATE BY PUTTING THE ITEM ID INTO THE REQ.BODY AND USING THE MONGOOSE FIND METHOD. NOW NEED TO FIGURE OUT HOW THE CODE BELOW WORKS IN THE USERCONTROLLER TO FIGURE OUT WHAT IS NEEDED FOR THIS UPDATEITEM FUNCTION. SHOULD PROBABLY REWATCH THIS PART IN THE TUTORIAL

    // if (user) {
    //     user.name = req.body.name || user.name;
    //     user.email = req.body.email || user.email;

    //     if (req.body.password) {
    //         user.password = req.body.password;
    //     }

    //     const updatedUser = await user.save();

    //     res.status(200).json({
    //         _id: updatedUser._id,
    //         name: updatedUser.name,
    //         email: updatedUser.email,
    //     })
    // } else {
    //     res.status(404);
    //     throw new Error('User not found');
    // }
});

//@desc     Delete House Item
//route     DELETE /api/house
//@access   Private
const deleteItem = asyncHandler(async (req, res) => {
    res.status(200).json({message: "House Item Deleted"});
});

export { 
    createItem,
    getItems,
    updateItem,
    deleteItem
};