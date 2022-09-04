const User = require("../user/user.model");
const userServices = require("../user/user.service");
const Auth = require("../user/user.service");
const { needsAuthToken } = require("../user/auth/auth.middleware");


const login = async (req, res) => {
  const loginData = req.body;
/*
if(loginData)
{
  const token = await userServices.authenticateUser(loginData);
  
  if(token){
  res.status(200).json(token);
  return token;
  }
  else {console.log('111111'); return"err";}

}
else
{
  console.log(e);
  return "worong email or password";
}
*/
  try {
    const loginValidation = await userServices.authenticateUser(loginData);
    res.status(200).json(loginValidation);
  } catch (e) {
    
    console.log(e);
  }

};


module.exports = {
login
};