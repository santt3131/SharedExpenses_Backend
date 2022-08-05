
const User = require('./user.model');
const auth = require('./auth/auth.service');
const { errMalformed, errUnauthorized } = require('../../errors');


const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
   // errMalformed(`Missing email or password 1`);
   console.log(`Missing email or password`);
   return "wrong email or password";
  }
  
  else {

    const user = await User.findOne({ email }).select("+password").lean().exec();

    if (!user) {  
    //errUnauthorized(`Wrong email or password 2`);
     console.log(`Wrong email or password`);
     return "wrong email or password";
    }
    
    const passwordMatches = await auth.comparePasswords(password, user.password);
    if (!passwordMatches) {
     // errUnauthorized('wrong password');
      console.log(`Wrong email or password`);
      return "wrong email or password";
    }
    
    const token = auth.createToken(email);
    return token;

  }
  
}

module.exports = {
  authenticateUser
}




