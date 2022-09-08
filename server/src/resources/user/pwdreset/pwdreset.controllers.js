const nodemailer = require("nodemailer");
var generator = require('generate-password');
const Auth = require("../auth/auth.service");
const User = require("../user.model");
const pwdreset = require("./pwdreset.model");
const { EMAIL_USER, EMAIL_PASSWORD } = require("../../../config");
//const { catchErrors, TodosApiError } = require("../../errors");
//const { exists } = require("./pwdreset.model");

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


const updatepassword = async (req, res) => {
  const { email, code, password } = req.body;
  const encryptedPassword = await Auth.encryptPassword(password);

  try {
    const exist = await pwdreset.findOne({ email: email });
    if (!exist) {
      return res.status(404).json({ status : "failed" });
    }
    
    const doc = await User.findOneAndUpdate({ email: email }, {password : encryptedPassword});
    const borrar = await pwdreset.findOneAndDelete({ email: email, code: code });

    return res.status(200).json({ status : "success" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status : "failed" });
  }
};



const resetPasswordEmail = async (req, res) => {

  const { email } = req.body;

  const userExist = await User.findOne({ email: email });

  var tempCode = generator.generate({ length: 4, numbers: true  });
  
  const resetRequest=[
    {
        "email":email,
        "code":tempCode,    
    }
];
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


            const doc = await pwdreset.create(resetRequest);

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
  updatepassword,
  resetPasswordEmail,
};
