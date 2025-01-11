const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");

const User = Sequelize.define(
	"User",
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false, // Ensures this field cannot be null
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false, // Ensures this field cannot be null
		},
		mobile: {
			type: DataTypes.STRING, // Use STRING to avoid issues with large numbers
			allowNull: false,
			unique: true, // Ensures the mobile field is unique
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true, // Ensures the email field is unique
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false, // Ensures the password is required
		},
		is_active: {
			type: DataTypes.BOOLEAN, // Changed to BOOLEAN for true/false values
			allowNull: false,
			defaultValue: true, // Defaults to true if not specified
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW, // Default current timestamp
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW, // Default current timestamp
			allowNull: false,
		},
		ip_address: {
			type: DataTypes.STRING,
			allowNull: false, // Ensures the IP address is required
		},
	},
	{
		timestamps: false, // Disable Sequelize's default timestamps
		tableName: "users", // Define the name of the table
	}
);

module.exports = User;
