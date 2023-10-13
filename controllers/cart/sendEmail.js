const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const result = await JSON.parse(req.body.body);
  // console.log(typeof (JSON.parse(result)))
  console.log(result.customerInfo);
  // console.log(result.payment)

  let newObj = {}
  const items = result.payment.map((item) => item.title+' - '+item.quantity+'шт. ')
  const summaryInfo = {
    name: result.customerInfo.name,
    number: result.customerInfo.number,
    sum: result.customerInfo.sum,
    items: items
  }
  console.log(items)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: email,
    to: email,
    subject: "Замовлення",
    template: "email",
    context: {
      data: summaryInfo,
    },
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message, "error");
    } else {
      console.log("mail sent", info);
      res.status(201).json({
        status: "success",
        code: 201,
        data: result,
      });
    }
  });
};

module.exports = sendEmail;
