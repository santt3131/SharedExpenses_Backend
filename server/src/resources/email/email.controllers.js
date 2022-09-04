const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD } = require("../../config");
const User = require("../user/user.model");
var generator = require('generate-password');



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
  const { name, email, message, authUser, invitationId } = req.body;

  try {
    // Verificar si ya el amigo existe
    const friendExist = await User.findOne({
      _id: authUser,
      friends: { $elemMatch: { friendEmail: email } },
    });
    if (friendExist) {
      console.log("Friend exists");
      return res.status(500).json({ error: "Friend already exists" });
    }

    // Enviar email de invitacion
    const send = await transporter.sendMail({
      from: '"Shared Expenses" <sharedexpenses.europe@gmail.com>', // remitente
      to: email, // destinatario
      subject: "Shared Expenses Invitation", // asunto
      html: message, // cuerpo
    });
    if (!send) {
      console.log("Error sending email");
      return res
        .status(500)
        .json({ error: "There was an errors sending email" });
    }

    // Registrar amigo en la BD
    const friend = await User.findOneAndUpdate(
      { _id: authUser },
      {
        $push: {
          friends: {
            friendId: "",
            friendName: name,
            friendEmail: email,
            invitationId: invitationId,
          },
        },
      },
      { new: true }
    );
    if (!friend) {
      console.log("Friend adding new friend in BD");
      return res.status(500).json({ error: "Error adding the new friend" });
    }

    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Errors inviting friends" });
  }
};

const resendInvitation = async (req, res) => {
  const { email, authUser } = req.body;

  try {
    // Buscar datos del amigo
    const friendExist = await User.findOne(
      { _id: authUser, "friends.friendEmail": email },
      { _id: 0, name: 1, friends: { $elemMatch: { friendEmail: email } } }
    );
    if (!friendExist) {
      console.log("Friend does not exist");
      return res.status(500).json({ error: "Friend does not exist" });
    }

    const message = `<h2>Shared Expenses Invitation</h2>
    <p>Hello, ${friendExist.friends[0].friendName}</p>
    <p>Your friend ${friendExist.name} has invited you to share expenses in an easy way through Shared Expenses, 
    for this you can:</p>
    <ol>
    <li>Download the application<br />
    <strong>Android: </strong>https://play.google.com/store/apps/details?id=com.SharedExpenses.SharedExpensesMobile<br />
    <strong>iOS: </strong>https://apps.apple.com/us/app/sharedexpenses/id512463895</li>
    <li>Register using this link<br />https://wwww.sharedexpenses.com/register?friend=${friendExist.friends[0].invitationId}</li>
    <ol>`;

    // Enviar email de invitacion
    const send = await transporter.sendMail({
      from: '"Shared Expenses" <sharedexpenses.europe@gmail.com>', // remitente
      to: email, // destinatario
      subject: "Shared Expenses Invitation", // asunto
      html: message, // cuerpo
    });
    if (!send) {
      console.log("Error sending email");
      return res
        .status(500)
        .json({ error: "There was an errors sending email" });
    }

    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Errors reinviting friends" });
  }
};

const resetPassword = async (req, res) => {

  const { email } = req.body;

  const userExist = await User.findOne({ email: email });

  var tempCode = generator.generate({ length: 10, numbers: true  });
  

  const message = `<h2>Shared Expenses password reset</h2>
  <p>Hello</p>
  <p> Your temporary password is :${tempCode} 
  please, use this link to update your new password</p>
  <ol>
  <li>Download the application<br />
  <strong>Android: </strong>https://play.google.com/store/apps/details?id=com.SharedExpenses.SharedExpensesMobile<br />
  <strong>iOS: </strong>https://apps.apple.com/us/app/sharedexpenses/id512463895</li>
  <li>Register using this link<br />https://wwww.sharedexpenses.com/register?friend</li>
  <ol>`;

  if(userExist){

      try {
            const send = await transporter.sendMail({
            from: '"Shared Expenses" <sharedexpenses.europe@gmail.com>', // remitente
            to: email, // destinatario
            subject: "sharedexpenses password reset", // asunto
            html: message, // cuerpo
          });
          if (!send) {
            console.log("Error sending email");
            return res
              .status(500)
              .json({ status: "bad" });
          }

          console.log("email sent sucessfully");
          return res
              .status(200)
              .json({  "user": email, 
              "code": tempCode,
              "status": "good"});

      } catch (error) {
        console.log(error, "email not sent");
      }
  }
  
  else {
    
    res.status(201).json({ error: "user not found "});
  }
  

};

module.exports = {
  resetPassword,
  sendInvitation,
  resendInvitation,
};
