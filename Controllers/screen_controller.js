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
    let cabinetsNumber = totalModules /18;
    let powerSupplyNumber = totalModules/6;
    let numberOfReceivingCards = cabinetsNumber ;

    const screenWidth = modulesInWidth*moduleWidth;
    const screenHeight = modulesInHeight*moduleHeight;
    let viewingDistance = 0;
    const pixelsPerModule = Math.floor((moduleWidth / (module.pixelpitch / 1000)) * (moduleHeight / (module.pixelpitch / 1000)));
    const totalPixels = totalModules * pixelsPerModule;
    
    
     if (type === "outdoor") {
        viewingDistance = module.pixelpitch*3
    }else{
        viewingDistance = module.pixelpitch*2
    }
    
    const suitableControllers = Controller.filter(controller => 
        (controller.portsNumber * controller.maxPixelCapacity) >= totalPixels
    );

    if (suitableControllers.length === 0) {
        // No suitable controller found
        return null;
    }

    // Find the controller with the smallest excess capacity
    let bestController = suitableControllers[0];
    let minExcessCapacity = (bestController.portsNumber * bestController.maxPixelCapacity) - totalPixels;

    for (let i = 1; i < suitableControllers.length; i++) {
        const currentController = suitableControllers[i];
        const currentCapacity = currentController.portsNumber * currentController.maxPixelCapacity;
        const excessCapacity = currentCapacity - totalPixels;

        if (excessCapacity < minExcessCapacity) {
            bestController = currentController;
            minExcessCapacity = excessCapacity;
        }
    }

    
    
    res.status(200).json({
        totalModules,
        bestController,
        screenWidth,
        screenHeight,
        cabinetsNumber,
        viewingDistance,
        powerSupplyNumber,
        numberOfReceivingCards,
        totalPixels,
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
