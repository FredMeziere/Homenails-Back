// Imports generaux
const { Router } = require("express");

// Imports des differents routeurs
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");


// Création du router principal
const router = Router();


// On branches les sous routeurs
router.use("/product", productRouter);


// On exporte le routeur principal
module.exports = router;