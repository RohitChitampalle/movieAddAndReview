// Importing required modules and functions
const express = require("express");
const router = express.Router();
const {
    handleAllReview,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview
} = require("../controller/review"); // Importing review controller functions
const upload = require("../middleware/handleFormData"); // Importing middleware for handling form data

// Route to get a list of all reviews
router.get("/list", upload.any(), handleAllReview);

// Route to add a new review
router.post("/add", upload.any(), handleAddReview);

// Route to update a review by ID
router.put("/update/:id", upload.any(), handleUpdateReview);

// Route to delete a review by ID
router.delete("/delete/:id", upload.any(), handleDeleteReview);

module.exports = router; // Exporting the router for use in other parts of the application
