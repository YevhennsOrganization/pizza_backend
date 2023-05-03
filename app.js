const app = require("express")();
const bodyParser = require("body-parser");
const ctrlWrapper = require("./middlewares");
const sendEmail = require("./controllers");
const logger = require("morgan");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
require("dotenv").config();

app.post("/sendemail", ctrlWrapper(sendEmail));

module.exports = app;
