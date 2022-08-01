const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD } = require("../../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendInvitation = async (req, res) => {
  const { email, message } = req.body;

  try {
    const send = await transporter.sendMail({
      from: '"Shared Expenses" <sharedexpenses.europe@gmail.com>', // remitente
      to: email, // destinatario
      subject: "Shared Expenses Invitation", // asunto
      html: message, // cuerpo
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Errors sending email " + error });
  }
};

module.exports = {
  sendInvitation,
};
