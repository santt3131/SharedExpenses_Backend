const nodemailer = require("nodemailer");
var generator = require('generate-password');
const Auth = require("../auth/auth.service");
const User = require("../user.model");
const Pendinguser = require("./pendinguser.model");
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




const newuserConfirmation = async (req, res) => {
  const { email, code } = req.body;

  try {

    const exist = await User.findOne({ email: email });
    const userData = await Pendinguser.findOne({ email: email });

    const newdata=[{
           "name":userData.name,
            "email":userData.email,
            "password":userData.password,
      }];

    console.log(code);

    if (exist) {
      return res.status(404).json({ status : "failed" });
    }

    if (userData.code == code) {
      const doc = await User.create(newdata);
      const borrar = await Pendinguser.findOneAndDelete({ email: email });
      return res.status(200).json({ status : "success" });
    }

    return res.status(404).json({ status : "failed" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status : "failed" });
  }
};



const registerEmail = async (req, res) => {


  const { name,email,password } = req.body;

  const userExist = await User.findOne({ email: email });

  console.log(userExist);

  const encryptedPassword = await Auth.encryptPassword(password);

  var tempCode = generator.generate({ length: 4, numbers: true  });
  
  const registerRequest=[
    {
        "name":name,
        "email":email,
        "password":encryptedPassword,
        "code":tempCode,    
    }
];
  const message = `<h2>Shared Expenses password reset</h2>
  <p>Hello</p>${name}
  <p> Your validation code is :${tempCode} 
  please, use this link to update your new password</p>
  <ol>
  <li>Download the application<br />
  <strong>Android: </strong>https://play.google.com/store/apps/details?id=com.SharedExpenses.SharedExpensesMobile<br />
  <strong>iOS: </strong>https://apps.apple.com/us/app/sharedexpenses/id512463895</li>
  <li>Register using this link<br />https://wwww.sharedexpenses.com/register?friend</li>
  <ol>`;

  if(!userExist){

      try {


            const doc = await Pendinguser.create(registerRequest);

            const send = await transporter.sendMail({
            from: '"Shared Expenses" <sharedexpenses.europe@gmail.com>', // remitente
            to: email, // destinatario
            subject: "sharedexpenses new account confirmation", // asunto
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
              "status": "success"});

      } catch (error) {
        console.log(error, "email not sent");
      }
  }
  
  else {
    
    res.status(201).json({ status: "user_already_exist "});
  }
  

};



module.exports = {
  registerEmail,
  newuserConfirmation,
  
};
