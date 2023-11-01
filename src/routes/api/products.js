const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../middlewares");

const { products: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

module.exports = router;
