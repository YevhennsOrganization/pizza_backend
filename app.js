const app = require("express")();
const bodyParser = require("body-parser");
const ctrlWrapper = require("./middlewares");
const { sendEmail } = require("./controllers");
const logger = require("morgan");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const router = require("./routes/api/pizza");

app.use(logger(formatsLogger));
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
require("dotenv").config();

// app.get("/", (req, res) => {
//   res.send('ok');
// });

app.post("/", ctrlWrapper(sendEmail));

app.use("/api/pizza", router);

// app.use((err, req, res, next) => {
//   const { status = 500 } = err;
//   res.status(status).json({ message: err.message });
// });

module.exports = app;
