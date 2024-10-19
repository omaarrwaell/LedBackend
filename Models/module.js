const mongoose = require('mongoose');

// Define the Module schema
const ModuleSchema = new mongoose.Schema({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  pixelpitch: {
    type: Number,
    required: true
  }
});

// Create the Module model
const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;
