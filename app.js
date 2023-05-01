const app = require("express")();
const bodyParser = require("body-parser");

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
const nodemailer = require("nodemailer");
require("dotenv").config();

app.get("/sendemail", async (req, res, next) => {
  const email = process.env.EMAIL;
  const transponter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: process.env.PASSWORD,
    },
  });
  const option = {
    from: email,
    to: email,
    subject: "Замовлення",
    text: "Ви отримали нове замовлення",
  };
  transponter.sendMail(option, function (error, info) {
    if (error) {
      console.log(error.message, "error");
    } else {
      console.log("mail sent", info);
    }
  });
});

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
