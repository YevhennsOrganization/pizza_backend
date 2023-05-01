const nodemailer = require("nodemailer");
// const { Cart } = require("../../models");

const sendEmail = async (req, res, next) => {
  const email = process.env.EMAIL;
  const { name, sum } = req.body;
  const result = await { ...name, ...sum };

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
    text: result,
  };
  transponter.sendMail(option, function (error, info) {
    if (error) {
      console.log(error.message, "error");
    } else {
      console.log("mail sent", info);
      //   res.status(201).json({
      //     status: "success",
      //     code: 201,
      //     data: { result },
      //   });
    }
  });
};

module.exports = { sendEmail };
