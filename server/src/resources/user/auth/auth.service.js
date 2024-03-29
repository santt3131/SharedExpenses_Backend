
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { errUnauthorized } = require('../../../errors');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

const comparePasswords = async (password, dbPassword) => {
return bcrypt.compare(password, dbPassword);
}

const createToken = (email) => {
  const token = jwt.sign({ email }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });
  return {
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: config.JWT_EXPIRATION,
  };
}

const decodeToken = (token) => {
  try {
    const result = jwt.verify(token, config.JWT_SECRET);
    return result;
  } catch (e) {
    switch (e.name) {
      case "JsonWebTokenError": {
        errUnauthorized(`Wrong token`);
        break;
      }
      case "TokenExpiredError": {
        errUnauthorized(`Token expired`);
        break;
      }
      default:
        throw e;
    }
  }
}

module.exports = {
  encryptPassword,
  comparePasswords,
  createToken,
  decodeToken,
}

