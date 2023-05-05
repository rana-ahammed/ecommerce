const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	fileUpload({
		useTempFiles: true,
		limits: { fileSize: 50 * 2024 * 1024 },
	})
);

// Config
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: "backend/config/config.env" });
}

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

if (process.env.NODE_ENV === "production") {
	const path = require("path");
	const __dirname1 = path.resolve();

	app.use(express.static(path.join(__dirname1, "../client/build")));

	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname1, "../client/build/index.html"));
	});
}

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
