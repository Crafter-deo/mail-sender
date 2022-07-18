const path = require("path");
const nodemailer = require("nodemailer");
const { promises: fs } = require("fs");

require("dotenv").config();

exports.postRegister = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {
      from: "adesolaadeoluwa@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
    };

    mailOptions.html = await fs.readFile(
      path.join(__dirname, "..", "/public/mail.html"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(err);
        }
      }
    );
    
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err.message);
        res.status(400);
        res.json({
          message: "An error occured, mail not sent",
        });
      } else {
        console.log("Email sent successfully");
        res.status(201);
        res.json({
          message: "successfully registered",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500);
    res.json({
      message: "Internal server error",
    });
  }
};
