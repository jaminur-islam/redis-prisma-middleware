const express = require("express");
const { userChecker, createUser } = require("../controller/userController");
const Router = express.Router();


Router.post("/" , userChecker , createUser);



module.exports = Router