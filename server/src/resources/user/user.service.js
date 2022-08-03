
const User = require('./user.model');
const auth = require('./auth/auth.service');
const { errMalformed, errUnauthorized } = require('../../errors');


const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    errMalformed(`Missing email or password 1`);
    return 0;
  }
  
  else {

    const user = await User.findOne({ email }).select("+password").lean().exec();

    if (!user) {  
     // console.log("Wrong email or password 2");
      errUnauthorized(`Wrong email or password 2`);
      return "Wrong email or password 2";
    }
    
    const passwordMatches = await auth.comparePasswords(password, user.password);
    if (!passwordMatches) {
      errUnauthorized('wrong password');
      return 0;
    }
    
    const token = auth.createToken(email);
    return token;

  }
  
}

module.exports = {
  authenticateUser
}




