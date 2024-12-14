//create powerSupply module that has name and quantity
const mongoose = require('mongoose');

const powerSupplySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const PowerSupply = mongoose.model('PowerSupply', powerSupplySchema);

module.exports = PowerSupply;