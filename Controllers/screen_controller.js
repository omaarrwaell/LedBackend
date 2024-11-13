const asyncHandler = require("express-async-handler");
const Screen = require("../Models/screen");
const Module = require("../Models/module");
const Controller = require("../Models/controller");
//create functions to get all screens and add a new screen
const getAllScreens = asyncHandler(async (req, res) => {
    try {
        const screens = await Screen.find();
        res.status(200).json(screens);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});

const screenCreation = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const width = req.body.width;
    const height = req.body.height;
    const module = req.body.module;
    const numberOfReceivingCards = req.body.numberOfReceivingCards;
    const controller = req.body.controller;
    const powerSupply = req.body.powerSupply;
    const steelStructure = req.body.steelStructure;
    const category = req.body.category;
    try {
        const screenToCreate = await Screen.create(
            {
                name,
                width,
                height,
                module,
                numberOfReceivingCards,
                controller,
                powerSupply,
                steelStructure,
                category
            }
        );

        res.status(200).json(screenToCreate);
    } catch (error) {    
        console.log(error);
        res.status(500).json({ "error": error })
    }

});

//create function given the width and height of the screen the output contains the number of modules needed for the screen and outputs the recommended controller based on the total pixels in the screen
const calculateScreen = asyncHandler(async (req, res) => {
    const width = req.body.width;
    const height = req.body.height;
    const moduleId = req.body.module;
    const type = req.body.type;


    const module = await Module.findById(moduleId);

    const moduleWidth = module.width;
    const moduleHeight = module.height;
    const modulesInWidth = Math.floor(width / moduleWidth);
    const modulesInHeight = Math.floor(height / moduleHeight);
    let totalModules = modulesInWidth * modulesInHeight;

    const screenWidth = modulesInWidth*moduleWidth;
    const screenHeight = modulesInHeight*moduleHeight;
    let viewingDistance = 0;
    if(type === "indoor"){
         viewingDistance = module.pixelpitch*2
    }
    else if (type === "outdoor") {
        viewingDistance = module.pixelpitch*3
    }
    let controller;
    if (totalPixels < 2600000) {
        recommendedControlSystem = "Recommended Control System: NovaStar VX400";
        controller = await Controller.findOne({ maxPixelCapacity: { $gte: totalPixels } });
    } else if (totalPixels < 39000000) {
        recommendedControlSystem = "Recommended Control System: NovaStar VX600";
        controller = await Controller.findOne({ maxPixelCapacity: { $gte: totalPixels } });
    } else if (totalPixels < 6500000) {
        recommendedControlSystem = "Recommended Control System: NovaStar VX1000";
        controller = await Controller.findOne({ maxPixelCapacity: { $gte: totalPixels } });
    } else {
        recommendedControlSystem = "No suitable control system available for the pixel count.";
    }
    totalPrice =  controller.price + module.price*totalModules;
    res.status(200).json({
        totalModules,
        recommendedControlSystem,
        screenWidth,
        screenHeight,
        viewingDistance,
        totalPrice
    });

});




const getScreenById = asyncHandler(async (req, res) => {
    try {
        const screen = await Screen.findById(req.params.id);
        res.status(200).json(screen);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});

const updateScreen = asyncHandler(async (req, res) => {
    try {
        const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(screen);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});

const deleteScreen = asyncHandler(async (req, res) => {
    try {
        const screen = await Screen.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});

module.exports = { getAllScreens, screenCreation ,calculateScreen, getScreenById, updateScreen, deleteScreen};
