import mongoose from "mongoose";

const houseItemSchema = mongoose.Schema({
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

const HouseItem = mongoose.model('HouseItem', houseItemSchema);

export default HouseItem;