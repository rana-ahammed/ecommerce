const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URL, {
			useNewUrlParser: true,
		})
		.then((data) => {
			console.log(
				`mongodb is connected with server: ${data.connection.host}`
			);
		});
};

module.exports = connectDatabase;
