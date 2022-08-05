
const config = require('./config');

class SEApiError extends Error {
  constructor(code, message) {
    super();
    this.name = "SEApiError";
    this.code = code;
    this.message = message;
  }
}

const catchErrors = (routeHandler) => async (req, res, next, ...args) => {
    try {
      await routeHandler(req, res, next, ...args);
    } catch (err) {
      next(err);
    }
  };

const errorHandler = (err, req, res, next) => {
  if (err.name === "SEApiError") {
    const { code, message } = err;
    return res.status(code).send({ error: message });
  }
  res.status(500).send({
    error: config.isDevelopment ? `Internal Server Error: ${err}` : `Internal Error`,
  });
};

const errMalformed = (message) => {
  throw new SEApiError(400, `Bad request: ${message}`);
};

const errUnauthorized = (message) => {
 throw new SEApiError(401, message);
};

module.exports = {
  SEApiError,
  catchErrors,
  errorHandler,
  errMalformed,
  errUnauthorized,
}; 
