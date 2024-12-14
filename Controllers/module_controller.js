const asyncHandler = require("express-async-handler");
const Module = require("../Models/module");

const moduleCreation = asyncHandler(async (req, res) => {
    const width = req.body.width;
    const height = req.body.height;
    const pixelpitch = req.body.pixelpitch;
    const type = req.body.type;
    try {
        const moduleToCreate = await Module.create(
            {
                width,
                height,
                pixelpitch,
                type
            }
        );

        res.status(200).json(moduleToCreate);
        res.send(moduleToCreate);
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
//create function to edit the quantity of the modules
const updateModule = asyncHandler(async (req, res) => {
    try {
        const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(module);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }   
})
//create function to delete modules
const deleteModule = asyncHandler(async (req, res) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
})

module.exports = {
    moduleCreation,
    getAllModules,
    updateModule,deleteModule
};
