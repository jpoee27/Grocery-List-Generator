import asyncHandler from 'express-async-handler';

//@desc     Create New House Item
//route     POST /api/house
//@access   Private
const createItem = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'House Item Created'});
});

//@desc     Get House Item
//route     GET /api/house
//@access   Private
const getItem = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'House Item'});
});

//@desc     Update House Item
//route     PUT /api/house
//@access   Private
const updateItem = asyncHandler(async (req, res) => {
    res.status(200).json({message: "House Item Updated"});
});

//@desc     Delete House Item
//route     DELETE /api/house
//@access   Private
const deleteItem = asyncHandler(async (req, res) => {
    res.status(200).json({message: "House Item Deleted"});
});

export { 
    createItem,
    getItem,
    updateItem,
    deleteItem
};