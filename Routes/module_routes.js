const express = require('express');
const router = express.Router();
const { moduleCreation, getAllModules } = require("../Controllers/module_controller");
const {protect} = require("../middlewares/authmiddleware");


router.post('/addModule',protect, moduleCreation);
router.get('/getAllModules',protect, getAllModules);

module.exports = router;