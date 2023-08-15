import mongoose from "mongoose";

const houseItemSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// }, {
//     timestamps: true,
});

const HouseItem = mongoose.model('HouseItem', houseItemSchema);

export default User;