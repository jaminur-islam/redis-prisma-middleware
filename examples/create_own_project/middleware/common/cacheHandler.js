const createHttpError = require("http-errors");
const redis = require("redis");
const redisUrl = "6379";
const client = redis.createClient(redisUrl);
client.connect();
const { db } = require("../../prismaClient/prismaClient");
const { prismaRedisCacheHandler } = require("redis-prisma-middleware");

async function cacheHandler(req, res, next) {
  await db.$use(prismaRedisCacheHandler(0, client));
  next();
}

module.exports = { cacheHandler };
