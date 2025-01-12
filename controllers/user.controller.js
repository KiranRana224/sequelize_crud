const User = require("../models/User");
const { userValidationSchema } = require("../validations/validate");
const bcrypt = require("bcrypt");

async function addUsers(req, res) {
	// Validate the incoming data using Joi schema
	try {
		// Validate request body
		await userValidationSchema.validateAsync(req.body); // This throws an error if validation fails

		const { first_name, last_name, mobile, email, password, is_active } =
			req.body;

		// Get the user's IP address (assuming Express is set up correctly)
		const userIp = req.ip;
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return res.status(400).json({
				error: "Email already exists", // Error message
				message: "The email is already associated with another user.",
			});
		}

		const currentTime = new Date(); // Get the current timestamp

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user with manual timestamps
		const newUser = await User.create({
			first_name,
			last_name,
			mobile,
			email,
			password: hashedPassword,
			is_active: is_active !== undefined ? is_active : true,
			ip_address: userIp,
			created_at: currentTime, // Manually set the created_at timestamp
			updated_at: currentTime, // Manually set the updated_at timestamp
		});

		res.status(201).json(newUser);
	} catch (error) {
		// If validation error, send a 400 Bad Request response
		if (error.isJoi) {
			res.status(400).json({
				error: "Validation error",
				message: error.details[0].message, // Send validation error message
			});
		} else {
			// For other errors, send a 500 Internal Server Error response
			res.status(500).json({ error: error.message });
		}
	}
}

async function getAllUsers(req, res) {
	try {
		// Destructure page and limit with default values
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		// Calculate offset for pagination
		const offset = (page - 1) * limit;
		const users = await User.findAll({
			limit: limit,
			offset: offset,
		});

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

async function getUserById(req, res) {
	try {
		const id = req.params.id;
		const user = await User.findOne({
			where: { user_id: id },
		});
		if (!user) {
			// If no user is found, return a 404
			return res.status(404).json({ message: "User not found" });
		}

		// Update the user with the data from the request body
		await user.update(req.body);
		res.status(200).json(user);
	} catch (error) {
		res.status(200).json(error);
	}
}

async function deleteUserById(req, res) {
	try {
		const id = req.params.id;
		const user = await User.findOne({ where: { user_id: id } });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await user.destroy();
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting user", error });
	}
}

module.exports = { addUsers, getAllUsers, getUserById, deleteUserById };
