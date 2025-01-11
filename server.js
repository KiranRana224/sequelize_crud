require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const sequelize = require("./config/db");

var corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", routes);

// Sync all models
sequelize
	.sync({ force: true }) // Use force: true to drop tables if they exist (use only in development)
	.then(() => {
		console.log("Database & tables created!");
	})
	.catch((err) => {
		console.error("Error syncing database:", err);
	});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
