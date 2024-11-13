const express = require("express");
const router = express.Router();

const {
    controllerCreation,
    getAllControllers
} = require("../Controllers/controller_controller");

router.post("/addController", controllerCreation);
router.get("/getAllControllers", getAllControllers);

module.exports = router;