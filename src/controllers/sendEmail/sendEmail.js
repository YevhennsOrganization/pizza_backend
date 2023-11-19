const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (req !== undefined) {
    const result = await JSON.parse(req.body.body);

    const items = result.order.map((item) => item);

    const summaryInfo = {
      name: result.customerInfo.name,
      number: result.customerInfo.number,
      sum: result.customerInfo.sum,
      comment: result.customerInfo.comment,
      address: result.customerInfo.address,
      items: items,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./src/views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/views/"),
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
  }
};

module.exports = sendEmail;
