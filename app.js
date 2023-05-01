const app = require("express")();
const bodyParser = require("body-parser");
const ctrlWrapper = require("./middlewares");
const sendEmail = require("./controllers");

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
require("dotenv").config();

app.post("/sendemail", ctrlWrapper(sendEmail));

const port = process.env.PORT;

app.listen(port || 3000, () => {
  console.log("Example app");
});
