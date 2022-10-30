# redis-cache-handler-middleware


## Features

- Cache Invalidation
- Supports custom cache keys
- cache and remove cache data automatically
- Caching multiple Prisma models each with a specific cache time
- Excluding certain Prisma models from being cached

## Supported Node.js versions

The latest versions of the following Node.js versions are tested and supported.
- 18

## Default Cached Methods

Here is a list of all the Prisma methods that are currently cached by default in `prisma-redis-middleware`.

- findUnique
- findUniqueOrThrow
- findFirst
- findFirstOrThrow
- findMany
- count
- aggregate
- groupBy
- findRaw
- aggregateRaw

`queryRaw` is not cached as it's executed against the Prisma db itself and not a model. This Prisma middleware is used
for caching queries based on the models that they are executed against.


## Default remove cache Methods

Here is a list of all the Prisma methods that are currently cached by default in `prisma-redis-middleware`.
  - create
  - createMany
  - update
  - updateMany
  - upsert
  - delete
  - deleteMany
  - executeRawUnsafe

The cache data of the model which calls these functions will be deleted automatically


## Quick Start

Install the package using `npm`:

```sh
npm i redis-cache-handler-middleware
```

## Code Example 

First you need an express middleware. Like [cacheHandler] and it will give you the data you want to cache, and if you add something to that model, it will use this middleware, if you add any new data to your model, the previous cache will be removed. And use the same middleware in the delete router so that when something is deleted, that cache data is removed.

```js
const express = require("express");
const Router = express.Router();
const {
  createPost,
  getAllPost,
  deleteAllPost,
} = require("../controller/postController");
const { cacheHandler } = require("../middleware/common/cacheHandler");

Router.get("/post", cacheHandler, getUserPost);
Router.post("/post", cacheHandler, createPost); 
Router.delete("/post",cacheHandler, deletePost)

```

# next
## cacheHandler middleware code example

First you need to configure the Redis client. After that the prisma client needs to be configured. Then the [prismaRedisCacheHandler] function must be used inside the [cacheHandler] middleware. This function takes 2 parameters. The first parameter is if you want to set the invalidation time of a model, then you have to give any number above 0. This number will be counted in seconds. After that fixed time, the cache will be removed. And if 0 then no invalidation time will be set.
And the second parameter is the redis client. You must pass these 2 parameters

```js
// redis configure
const redis = require("redis");
const redisUrl = "6379";
const client = redis.createClient(redisUrl);
const { prismaRedisCacheHandler } = require("redis-cache-handler-middleware");
client.connect();

// prisma configure
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function cacheHandler(req, res, next) {
  await prisma.$use(prismaRedisCacheHandler(0, client));
  next();
}

module.exports = { cacheHandler };

```



  

