const express = require('express');
const router = express.Router();

const { powerSupplyCreation, getAllPowerSupplies ,editPowerSupply,deletePowerSupply} = require("../Controllers/powerSupply_controller");
const {protect} = require("../middlewares/authmiddleware");

router.post('/addPowerSupply',protect, powerSupplyCreation);
router.get('/getAllPowerSupplies',protect, getAllPowerSupplies);
router.put('/updatePowerSupply/:id',protect, editPowerSupply);
router.delete('/deletePowerSupply/:id',protect, deletePowerSupply);
module.exports = router;