const express = require('express');
const router = express.Router();
const { moduleCreation, getAllModules ,updateModule,deleteModule} = require("../Controllers/module_controller");
const {protect} = require("../middlewares/authmiddleware");


router.post('/addModule',protect, moduleCreation);
router.get('/getAllModules',protect, getAllModules);
router.put('/updateModule/:id',protect, updateModule);
router.delete('/deleteModule/:id',protect, deleteModule);
module.exports = router;