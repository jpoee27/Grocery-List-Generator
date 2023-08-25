import mongoose from "mongoose";

const groceryItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        required: true
    },
    user: {
        type: String,
        require: true
    },
}, {
    timestamps: true,
});

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

export default GroceryItem;