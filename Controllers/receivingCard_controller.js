const asyncHandler = require("express-async-handler");
const ReceivingCard = require("../Models/receivingCard");

const getAllReceivingCards = asyncHandler(async (req, res) => {
    try {
        const receivingCards = await ReceivingCard.find();
        res.status(200).json(receivingCards);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});

const receivingCardCreation = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    try {
        const receivingCardToCreate = await ReceivingCard.create(
            {
                name,
                quantity
            }
        );

        res.status(200).json(receivingCardToCreate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});
//create function to edit the quantity of a receiving card
const receivingCardQuantity = asyncHandler(async (req, res) => {
    try {
        const receivingCard = await ReceivingCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(receivingCard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
});
//create function to delete a receiving card
const deleteReceivingCard = asyncHandler(async (req, res) => {
    try {
        const receivingCard = await ReceivingCard.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error })
    }
})




module.exports = {
    getAllReceivingCards,
    receivingCardCreation,
    receivingCardQuantity,
    deleteReceivingCard
};