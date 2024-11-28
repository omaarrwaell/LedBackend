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
    res.status(500).json({ error: error });
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
    const screenToCreate = await Screen.create({
      name,
      width,
      height,
      module,
      numberOfReceivingCards,
      controller,
      powerSupply,
      steelStructure,
      category,
    });

    res.status(200).json(screenToCreate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

const calculateScreen = asyncHandler(async (req, res) => {
  const width = req.body.width;
  const height = req.body.height;
  const moduleId = req.body.module;
  const type = req.body.type;

  console.log(width, height, moduleId);
  const module = await Module.findById(moduleId);

  const moduleWidth = module.width;
  const moduleHeight = module.height;
  const modulesInWidth = Math.floor((width * 100) / moduleWidth);
  const modulesInHeight = Math.floor((height * 100) / moduleHeight);
  console.log(modulesInWidth, modulesInHeight);

  let cabinetsNumber = width * height;
  let totalModules = cabinetsNumber * 18;
  let powerSupplyNumber = cabinetsNumber * 3;
  let numberOfReceivingCards = cabinetsNumber;
  console.log(
    cabinetsNumber,
    powerSupplyNumber,
    numberOfReceivingCards,
    totalModules
  );
  const screenWidth = width * 0.96;
  const screenHeight = height * 0.96;
  console.log(screenWidth, screenHeight);
  let viewingDistance = 0;
  const pixelsPerModule = Math.floor(
    ((moduleWidth * 10) / module.pixelpitch) *
      ((moduleHeight * 10) / module.pixelpitch)
  );
  const totalPixels = totalModules * pixelsPerModule;
  console.log(totalPixels);

  if (type === "outdoor") {
    viewingDistance = module.pixelpitch * 3;
  } else {
    viewingDistance = module.pixelpitch * 2;
  }
  const controllers = await Controller.find();

  const suitableControllers = controllers.filter(
    (controller) =>
      controller.portsNumber * controller.maxPixelCapacity >= totalPixels
  );
  console.log(suitableControllers);
  if (suitableControllers.length === 0) {
    // No suitable controller found
    return null;
  }

  // Find the controller with the smallest excess capacity
  let bestController = suitableControllers[0];
  let minExcessCapacity =
    bestController.portsNumber * bestController.maxPixelCapacity - totalPixels;

  for (let i = 1; i < suitableControllers.length; i++) {
    const currentController = suitableControllers[i];
    const currentCapacity =
      currentController.portsNumber * currentController.maxPixelCapacity;
    const excessCapacity = currentCapacity - totalPixels;

    if (excessCapacity < minExcessCapacity) {
      bestController = currentController;
      minExcessCapacity = excessCapacity;
    }
  }

  let screenArea = screenWidth * screenHeight;
  let totalPrice = 0;
  if (module.pixelpitch == 1.8 && module.type == "indoor_GOB") {
    totalPrice = 94500 * screenArea;
  } else if (module.pixelpitch == 1.8 && module.type == "indoor_flex") {
    totalPrice = 90450 * screenArea;
  } else if (module.pixelpitch == 1.8 && module.type == "indoor") {
    totalPrice = 75600 * screenArea;
  } else if (module.pixelpitch == 2.5) {
    totalPrice = 53325 * screenArea;
  } else if (module.pixelpitch == 4 && module.type == "indoor") {
    totalPrice = 41175 * screenArea;
  } else if (module.pixelpitch == 4 && module.type == "outdoor") {
    totalPrice = 116100 * screenArea;
  } else if (module.pixelpitch == 5) {
    totalPrice = 60075 * screenArea;
  } else if (module.pixelpitch == 8) {
    totalPrice = 51975 * screenArea;
  }
  totalPrice += bestController.price;
  totalPrice += screenArea * 5000;

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
    totalPrice,
    screenArea,
  });
});

const getScreenById = asyncHandler(async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id);
    res.status(200).json(screen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

const updateScreen = asyncHandler(async (req, res) => {
  try {
    const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(screen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

const deleteScreen = asyncHandler(async (req, res) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = {
  getAllScreens,
  screenCreation,
  calculateScreen,
  getScreenById,
  updateScreen,
  deleteScreen,
};
