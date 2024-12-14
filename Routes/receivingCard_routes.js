const express = require('express');
const router = express.Router();
//receivingCard controller
const { receivingCardCreation, getAllReceivingCards ,receivingCardQuantity,deleteReceivingCard} = require("../Controllers/receivingCard_controller");
const {protect} = require("../middlewares/authmiddleware");

router.post('/addReceivingCard',protect, receivingCardCreation);
router.get('/getAllReceivingCards',protect, getAllReceivingCards);
router.put('/updateReceivingCard/:id',protect, receivingCardQuantity);
router.delete('/deleteReceivingCard/:id',protect, deleteReceivingCard);
module.exports = router;