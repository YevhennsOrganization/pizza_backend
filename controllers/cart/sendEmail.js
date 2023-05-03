const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("node:path");

const sendEmail = async (req, res, next) => {
  const email = process.env.EMAIL;
  const pasword = process.env.PASSWORD;
  const result = await req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pasword,
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
      data: Object.values(result),
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message, "error");
    } else {
      console.log("mail sent", info);
      res.status(201).json({
        status: "success",
        code: 201,
        data: { result },
      });
    }
  });
};

module.exports = sendEmail;
