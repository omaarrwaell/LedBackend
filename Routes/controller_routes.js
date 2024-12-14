const express = require("express");
const router = express.Router();

const {
    controllerCreation,
    getAllControllers,updateController,deleteController
} = require("../Controllers/controller_controller");
const {protect} = require("../middlewares/authmiddleware");

router.post("/addController",protect, controllerCreation);
router.get("/getAllControllers",protect, getAllControllers);
router.put("/updateController/:id",protect, updateController);
router.delete("/deleteController/:id",protect, deleteController);
module.exports = router;