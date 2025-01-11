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
			console.error("Error adding user:", error);
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = { addUsers };
