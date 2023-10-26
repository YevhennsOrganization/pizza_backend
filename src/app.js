const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
require("dotenv").config();

const healthcheckRouter = require("./routes/api/healthcheck");
const pizzaRouter = require("./routes/api/pizza");
const appetizerRouter = require("./routes/api/appetizer");
const drinkRouter = require("./routes/api/drink");
const sendEmailRouter = require("./routes/api/sendEmail");

app.use(logger(formatsLogger));
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());

app.use("/", healthcheckRouter);
app.use("/", sendEmailRouter);
app.use("/api/pizzas", pizzaRouter);
app.use("/api/appetizers", appetizerRouter);
app.use("/api/drinks", drinkRouter);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res) {
  res.status(500);
  res.render("error", { error: err });
}

module.exports = app;