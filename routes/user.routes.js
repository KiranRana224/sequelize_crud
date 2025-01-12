const express = require("express");
const routes = express.Router();
const {
	addUsers,
	getAllUsers,
	getUserById,
	deleteUserById,
} = require("../controllers/user.controller");
routes.post("/addUser", addUsers);
routes.get("/getAllUsers", getAllUsers);
routes.put("/getUserById/:id", getUserById);
routes.delete("/deleteUserById/:id", deleteUserById);

module.exports = routes;
