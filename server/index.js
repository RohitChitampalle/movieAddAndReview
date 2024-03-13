// Import required modules and packages
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const movies = require("./routes/movie");
const reviews = require("./routes/reviews");

// Import MySQL connection
const connection = require("./model/index");

// Create an Express application
const app = express();

// Set the port for the server to listen on
const port = 8224;

// Load environment variables from a .env file
dotenv.config();

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/api/movie", movies); // Movie-related routes
app.use("/api/review", reviews); // Review-related routes

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);

    // Connect to MySQL database
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connection created with MySQL successfully");
    });
});

