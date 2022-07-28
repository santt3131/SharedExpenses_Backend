
//const { errUnauthorized } = require("../../errors");
const auth = require('./auth.service');

const needsAuthToken = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    if (!header) {
      errUnauthorized(`Missing auth header`);
    }
    if (!header.startsWith("Bearer ")) {
      errUnauthorized(`Authorization header doesn't start with "Bearer"`);
    }
    const token = header.slice("Bearer ".length);
    const { email } = auth.decodeToken(token);
    // TODO: opcional: cargar los datos del usuario
    req.userEmail = email;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  needsAuthToken,
}
