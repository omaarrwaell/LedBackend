const asyncHandler = require("express-async-handler");
const PowerSupply = require("../Models/powerSupply");

//create a function to get all power supplies
const getAllPowerSupplies = asyncHandler(async (req, res) => {
    try {
        const powerSupplies = await PowerSupply.find();
        res.status(200).json(powerSupplies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});

//create a function to add a new power supply
const powerSupplyCreation = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    try {
        const powerSupplyToCreate = await PowerSupply.create(
            {
                name,
                quantity
            }
        );

        res.status(200).json(powerSupplyToCreate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});
// create a function to edit the quantity of a power supply
const editPowerSupply = asyncHandler(async (req, res) => {
    try {
        const powerSupply = await PowerSupply.findById(req.params.id);
        powerSupply.quantity = req.body.quantity;
        await powerSupply.save();
        res.status(200).json(powerSupply);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
})
//create function to delete a power supply
const deletePowerSupply = asyncHandler(async (req, res) => {
    try {
        const powerSupply = await PowerSupply.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
})

module.exports = { getAllPowerSupplies, powerSupplyCreation , editPowerSupply,deletePowerSupply};