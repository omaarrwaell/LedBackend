const asyncHandler = require("express-async-handler");
const Controller =  require("../Models/controller")

//create function to get all controllers
const getAllControllers = asyncHandler(async (req, res) => {
    try {
        const controllers = await Controller.find();
        res.status(200).json(controllers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});
//create function to add a new controller
const controllerCreation = asyncHandler(async (req, res) => {
    const maxPixelCapacity = req.body.maxPixelCapacity;
    const portsNumber = req.body.portsNumber;
    const name = req.body.name;
    const price = req.body.price;
    try {
        const controllerToCreate = await Controller.create(
            {
                maxPixelCapacity,
                portsNumber,
                name,
                price
            }
        );

        res.status(200).json(controllerToCreate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }

});

module.exports = {getAllControllers, controllerCreation}
