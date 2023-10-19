const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
require("dotenv").config();

const healthcheckRouter = require("./routes/healthcheck");
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
app.use("/api/sendEmail", sendEmailRouter);
app.use("/api/pizza", pizzaRouter);
app.use("/api/appetizer", appetizerRouter);
app.use("/api/drink", drinkRouter);
app.use((err, req, res) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
