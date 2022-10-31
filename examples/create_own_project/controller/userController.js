const createHttpError = require("http-errors");
const { db } = require("../prismaClient/prismaClient");
async function createUser(req, res, next) {
  const { name, email } = req.body;
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });
    res.send(user);
  } catch (error) {
    next(createHttpError(400, "Something wrong...!"));
  }
}

async function userChecker(req, res, next) {
  const { name, email } = req.body;
  try {
    const alreadyUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyUser === null) {
      next();
    } else {
      res.send(alreadyUser);
    }
  } catch (error) {
    next(createHttpError(error.status, error.message));
  }
}

module.exports = { createUser, userChecker };
