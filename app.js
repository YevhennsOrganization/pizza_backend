const app = require("express")();
const bodyParser = require("body-parser");

const { sendEmail } = require("./controllers");

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
require("dotenv").config();

app.post("/sendemail", sendEmail);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//localhost:3000/contact

app.use((req, res, next) => {
  console.log("Наше проміжне ПЗ");
  next();
});

const port = process.env.PORT;

app.listen(port || 3000, () => {
  console.log("Example app");
});
