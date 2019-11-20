// ========================
// Dependencies
// ========================

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")

const app = express();
const db = mongoose.connection;

require("dotenv").config();


// REPLACE THIS WITH NEW CONTROLLERS
// const restaurantsController = require('./controllers/restaurants.js')
// const usersController = require('./controllers/users.js')
// const sessionsController = require('./controllers/sessions.js')

// ========================
// Port
// ========================

const PORT = process.env.PORT;

// ========================
// Database
// ========================

const PROJECT3_DB = process.env.MONGODB_URI;

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

// UNCOMMENT OUT LATER
// Use public folder for static assets
// app.use(express.static('public'))

app.use(session({
	secret: 'feedmeseymour',
	resave: false,
	saveUninitialized: false
}))

// REPLACE THIS LATER
// app.use('/restaurants', restaurantsController)
// app.use('/users', usersController)
// app.use('/sessions', sessionsController)

// ========================
// Routes
// ========================

console.log(process.env)

app.get('/', (req, res) => {
	res.send("hello world")
})

// ========================
// Listener
// ========================

app.listen(PORT, () => {
	console.log('listening on port: ', PORT)
})