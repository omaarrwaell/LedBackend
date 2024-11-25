//create model called screen which has this as attributes name,width,height,module,number of receiving cards,controller,powersupply,steel structure/die cast , GOB/outdoor/indoor
const mongoose = require('mongoose');
const Module = require('./module');
const Controller = require('./controller');


const screenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    module: {   type:mongoose.Schema.Types.ObjectId,ref:'Module' },
    numberOfReceivingCards: { type: Number, required: false },
    controller: {   type:mongoose.Schema.Types.ObjectId,ref:'Controller' },
    powerSupplyNumber: { type: Number, required: false },
    category: { type: String, required: true },
    viewingDistance: { type: Number, required: false },
    price : { type: Number, required: false },
    cabinetsNumber:{ type: Number, required: false },

});

const Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;