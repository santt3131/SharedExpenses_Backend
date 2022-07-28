
const User = require('./user.model');
const auth = require('./auth/auth.service');
//const { errMalformed, errUnauthorized } = require('../errors');


const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    errMalformed(`Missing email or password`);
  }
  /*
  const user = await User.findOne({ email }).select("+password").lean().exec();
  if (!user) {  
    errUnauthorized(`Wrong email or password`);
  }
  
  const passwordMatches = await auth.comparePasswords(password, user.password);
  if (!passwordMatches) {
    errUnauthorized(`Wrong email or password`);
  }
  */
  const token = auth.createToken(email);
  return token;
}
const createUser = async ({ email, password: plaintextPassword }) => {
  const encryptedPassword = await auth.encryptPassword(plaintextPassword);
  return await User.create({ email, password: encryptedPassword });
}
module.exports = {
  authenticateUser,
  createUser,
}




