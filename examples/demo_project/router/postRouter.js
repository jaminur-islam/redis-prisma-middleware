const express = require("express");
const Router = express.Router();
const {
  getAllUserPost,
  createPost,
  getAllPost,
  deleteAllPost,
} = require("../controller/postController");
const { cacheHandler } = require("../middleware/common/cacheHandler");

Router.get("/", cacheHandler, getAllUserPost);
Router.post("/", cacheHandler, createPost);
Router.delete("/", cacheHandler, deleteAllPost);
Router.get("/all", getAllPost);

module.exports = Router;
