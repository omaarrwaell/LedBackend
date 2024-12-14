//create receivingCard module that has name and quantity
const mongoose = require('mongoose');   

const receivingCardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const ReceivingCard = mongoose.model('ReceivingCard', receivingCardSchema);

module.exports = ReceivingCard;
