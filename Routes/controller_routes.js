const express = require("express");
const router = express.Router();

const {
    controllerCreation,
    getAllControllers
} = require("../Controllers/controller_controller");
const {protect} = require("../middlewares/authmiddleware");

router.post("/addController",protect, controllerCreation);
router.get("/getAllControllers",protect, getAllControllers);

module.exports = router;