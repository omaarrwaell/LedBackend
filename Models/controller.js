const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Define the Module schema
const ControllerSchema = new mongoose.Schema({
  maxPixelCapacity: {
    type: Number,
    required: true
  },
  portsNumber: {
    type: Number,
    required: true
  }
  ,price : {
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  }
});

// Create the Module model
const Controller = mongoose.model('Controller', ControllerSchema);

module.exports = Controller;
