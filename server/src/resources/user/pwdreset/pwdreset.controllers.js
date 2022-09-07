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

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOne({ _id: id }).populate("groups").exec();
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get Cutomer" });
  }
};
const findOneByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const doc = await User.findOne({ "email": email });
    if (!doc) {
      console.log(email);
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
    console.log(doc.name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get Cutomer" });
  }
};

const createOne = async (req, res) => {
  try {
    const newUser = req.body;
    console.log("new User es", newUser);
    const encryptedPassword = await Auth.encryptPassword(newUser.password);
    const newdata=[
      {
           "name":newUser.name,
            "email":newUser.email,
            "password":encryptedPassword,
       }
   ]   ;
   
   const exist = await User.findOne({ "email": newUser.email });
   if(!exist){
    const doc = await User.create(newdata);
    console.log("doc es ", doc);
    //res.status(201).json({ results: [doc] });
    res.status(201).json({ message: "user_created" });
    console.log("user created succesfully");

   }
   else {
    console.log("user exists");
    res.status(200).json({ message: "user_exist" });
   }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to create the user account" });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot update" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot delete" });
  }
};




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
