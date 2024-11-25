const express = require("express");
const router = express.Router();

const{ getAllScreens, screenCreation, getScreenById, updateScreen, deleteScreen ,calculateScreen} = require("../Controllers/screen_controller");
const {protect} = require("../middlewares/authmiddleware");
router.post("/addScreen",protect, screenCreation);
router.get("/getAllScreens", protect,getAllScreens);
router.get("/getScreenById/:id",protect, getScreenById);
router.put("/updateScreen/:id",protect, updateScreen);
router.delete("/deleteScreen/:id",protect, deleteScreen);
router.post("/calculateScreen",protect, calculateScreen);  
module.exports = router;