// ========================
// Dependencies
// ========================

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const db = mongoose.connection;

require("dotenv").config();


const wishlistController = require("./controllers/wishlist.js");

// REPLACE THIS WITH NEW CONTROLLERS
// const usersController = require('./controllers/users.js')
// const sessionsController = require('./controllers/sessions.js')

// ========================
// Port
// ========================

const PORT = process.env.PORT;

// ========================
// Database
// ========================

const PROJECT3_DB = process.env.PROJECT3_DB;

mongoose.connect(PROJECT3_DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// Error / Success
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", PROJECT3_DB));
db.on("disconnected", () => console.log("mongo disconnected"));

// ========================
// Middleware
// ========================

// Use public folder for static assets
app.use(express.static('public'))

app.use(
	session({
		secret: "feedmeseymour",
		resave: false,
		saveUninitialized: false
	})
);

app.use("/wishlist", wishlistController);

// REPLACE THIS LATER
// app.use('/users', usersController)
// app.use('/sessions', sessionsController)

// ========================
// Listener
// ========================

app.listen(PORT, () => {
	console.log("listening on port: ", PORT);
});
