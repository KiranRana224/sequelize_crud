const express = require("express");
const routes = express.Router();
const { addUsers } = require("../controllers/user.controller");
routes.post("/addUser", addUsers);
module.exports = routes;
