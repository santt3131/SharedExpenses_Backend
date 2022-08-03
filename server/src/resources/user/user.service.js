
const User = require('./user.model');
const auth = require('./auth/auth.service');
const { errMalformed, errUnauthorized } = require('../../errors');


const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    errMalformed(`Missing email or password 1`);
  }
  
  else {

    const user = await User.findOne({ email }).select("+password").lean().exec();

    if (!user) {  
      errUnauthorized(`Wrong email or password 2`);
    }
    
    const passwordMatches = await auth.comparePasswords(password, user.password);
    if (!passwordMatches) {
      errUnauthorized('wrong password');
      return "wrong pass";
    }
    
    const token = auth.createToken(email);
    return token;

  }
  
}

module.exports = {
  authenticateUser
}




