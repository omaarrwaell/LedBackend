const express = require('express');
const router = express.Router();
const { moduleCreation, getAllModules } = require("../Controllers/module_controller");

router.post('/addModule', moduleCreation);
router.get('/getAllModules', getAllModules);

module.exports = router;