
const User = require('./user.model');
const auth = require('./auth/auth.service');
const { errMalformed, errUnauthorized } = require('../../errors');


const authenticateUser = async (req, res) => {

  const { email, password} = req.body;

  if (!email || !password) {
    //errMalformed(`Missing email or password 1`);
    const loginValidation=
    {
          "loginResult":"bad",
          "error": "no data", 
     }; 
     return loginValidation;
  }
  
  const user = await User.findOne({ email }).select("+password").lean().exec();
  if (!user) { 
    const loginValidation=
    {
          "loginResult":"bad",
          "error": "Wrong email", 
     }; 
     return loginValidation;
     
     //errUnauthorized(`Wrong email or password 2`);
  }
  
  const passwordMatches = await auth.comparePasswords(password, user.password);
  if (!passwordMatches) {
    //errUnauthorized('wrong password');
    const loginValidation=
    {
          "loginResult":"failed",
          "error":"wrong password",
     };

    return loginValidation;

    
  }
  
  const token = auth.createToken(email);

  const loginValidation=
    {
          "loginResult":"good",
          "userId":user._id,
          "userGroups":user.groups,
          "userToken":token
     };

  return loginValidation;
  
}

module.exports = {
  authenticateUser
}




