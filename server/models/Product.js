const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    cost: { type: Number },
    brand: { type: String },
    description: { type: String },
    quantity: { type: Number, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);
