const createError = require("http-errors");
const helperRoutes = async (req, res, next) => {
  return next(createError.NotFound("This route does not exist"));
};
const generalError = async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

function createResponseObject(status, message, data) {
  return {
    status: status,
    message: message,
    data: data
  };
}

module.exports = {
  helperRoutes,
  generalError,
  createResponseObject
};
