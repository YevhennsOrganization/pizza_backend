const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../middlewares");

const { drink: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/", ctrlWrapper(ctrl.add));

module.exports = router;
