const express = require("express");
const router = express.Router();

const{ getAllScreens, screenCreation, getScreenById, updateScreen, deleteScreen ,calculateScreen} = require("../Controllers/screen_controller");

router.post("/addScreen", screenCreation);
router.get("/getAllScreens", getAllScreens);
router.get("/getScreenById/:id", getScreenById);
router.put("/updateScreen/:id", updateScreen);
router.delete("/deleteScreen/:id", deleteScreen);
router.post("/calculateScreen", calculateScreen);  
module.exports = router;