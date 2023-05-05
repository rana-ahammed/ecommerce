const app = require("./app.js");

const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database.js");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to uncaught exception`);
	process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: "config/config.env" });
}

// connecting to database
connectDatabase();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to unhandled promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});
