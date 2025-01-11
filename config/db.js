const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	process.env.db,
	process.env.host,
	process.env.password,
	{
		host: "localhost",
		dialect: "mysql",
		logging: false,
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = sequelize; // Export the sequelize instance for use in other files
