const createError = require("http-errors");
async function notFound(req, res, next) {
  // this error message will send errorHandler middleware and get this message on err.message
  next(createError(404, "Your requested content was not found!"));
}
async function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send(err.message || "Something wrong");
}

module.exports = { errorHandler, notFound };
