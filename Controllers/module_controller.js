const asyncHandler = require("express-async-handler");
const Module = require("../Models/module");

const moduleCreation = asyncHandler(async (req, res) => {
    const width = req.body.width;
    const height = req.body.height;
    const pixelpitch = req.body.pixelpitch;
    console.log(req.body)
    console.log(width + "  " + height + " " + pixelpitch);
    try {
        const moduleToCreate = await Module.create(
            {
                width,
                height,
                pixelpitch
            }
        );

        res.status(200).json(moduleToCreate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }

});

const getAllModules = asyncHandler(async (req, res) => {
    try {
        const modules = await Module.find();
        res.status(200).json(modules);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});

module.exports = {
    moduleCreation,
    getAllModules
};
