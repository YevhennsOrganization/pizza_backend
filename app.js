const app = require("express")();
const bodyParser = require("body-parser");
const ctrlWrapper = require("./middlewares");
const logger = require("morgan");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { sendEmail } = require("./controllers");
const { router: pizzaRouter } = require("./routes/api/pizza");
const { router: appetizerRouter } = require("./routes/api/appetizer");
const { router: drinkRouter } = require("./routes/api/drink");

app.use(logger(formatsLogger));
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send(`<p>Ok</p>`);
});

app.post("/", ctrlWrapper(sendEmail));

app.use("/api/pizza", pizzaRouter);

app.use("/api/appetizer", appetizerRouter);

app.use("/api/drink", drinkRouter);

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
