const createHttpError = require("http-errors");
const { db } = require("../prismaClient/prismaClient");

async function createPost(req, res, next) {
  try {
    const { title, description, userId } = req.body;
    const post = await db.post.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.send(post);
  } catch (err) {
    next(createHttpError(err.status, err.message));
  }
}

async function getAllUserPost(req, res, next) {
  console.log("this data postgresql");
  try {
    const userAllPost = await db.post.findMany({
      where: {
        userId: Number(req.query.id),
      },
    });
    res.send(userAllPost);
    // req.redisClient.set(req.query.id, JSON.stringify(userAllPost));
  } catch (err) {
    next(createHttpError(err.status, err.message));
  }
}

async function getAllPost(req, res) {
  try {
    const allPostData = await db.post.findMany({});
    res.send(allPostData);
  } catch (err) {
    next(createHttpError(err.status, err.message));
  }
}

async function deleteAllPost(req, res) {
  try {
    const data = await db.post.deleteMany({});
    res.send("ok every thing is deleted");
  } catch (err) {
    next(createHttpError(err.status, err.message));
  }
}

module.exports = { createPost, deleteAllPost, getAllUserPost, getAllPost };
