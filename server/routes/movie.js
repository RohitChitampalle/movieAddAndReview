// Importing required modules and dependencies
const express = require("express");
const router = express.Router();
const {
    handleGetAllMovies,
    handleAddMovie,
    handleMovieUpdate,
    handleDeleteMovie,
    handleMovieSpecificData
} = require("../controller/movie"); // Importing movie-related controller functions
const upload = require("../middleware/handleFormData"); // Importing middleware for handling form data

// Define routes for movie-related operations
router.get("/list", upload.any(), handleGetAllMovies); // Route to get a list of all movies
router.post("/add", upload.any(), handleAddMovie); // Route to add a new movie
router.get("/:id", upload.any(), handleMovieSpecificData); // Route to get specific movie data by ID
router.put("/update/:id", upload.any(), handleMovieUpdate); // Route to update movie details by ID
router.delete("/delete/:id", upload.any(), handleDeleteMovie); // Route to delete a movie by ID

module.exports = router; // Export the router for use in other parts of the application
