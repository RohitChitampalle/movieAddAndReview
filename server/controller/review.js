const connection = require("../model/index");

/**
 * Handles fetching all movie reviews, including movie details.
 * Responds with a JSON array containing reviews or a message if no data is present.
 */
let handleAllReview = async (req, res) => {
    try {
        let dataNotFound = [{
            "message": "Data Not present !"
        }];

        // Query to fetch all movies with associated reviews
        let query = `
        SELECT details_of_movies.movie_name, movie_reviews.*
        FROM details_of_movies
        LEFT JOIN movie_reviews ON details_of_movies.id = movie_reviews.movie_id;
        `;

        connection.query(query, (err, results) => {
            if (results.length === 0) {
                return res.status(201).json(dataNotFound);
            }

            if (err) {
                console.error('Error querying database:', err);
                return res.status(501).json([{
                    "Error": err.sqlMessage
                }]);
            }

            return res.status(201).json(results);
        });
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

/**
 * Handles adding a new movie review.
 * Responds with a success message and the inserted review_id.
 */
let handleAddReview = async (req, res) => {
    const {
        movie_id,
        reviewer_name,
        rating,
        review_comments
    } = req.body;

    try {
        // Query to insert a new movie review
        let query = `INSERT INTO movie_reviews (movie_id, reviewer_name, rating, review_comments)
                     VALUES("${movie_id}", "${reviewer_name}", "${rating}", "${review_comments}")`;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(501).json([{
                    "Error": err.sqlMessage
                }]);
            }

            // Send the result as JSON response
            res.json({
                success: true,
                "review_id": results.insertId
            });
        });
    } catch (error) {
        console.error('Error adding a new movie review:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

/**
 * Handles updating an existing movie review.
 * Responds with a success message or an error if the review is not found.
 */
let handleUpdateReview = async (req, res) => {
    const reviewId = req.params.id;
    const {
        movie_id,
        reviewer_name,
        rating,
        review_comments
    } = req.body;

    try {
        // Query to update a movie review
        let query = `UPDATE movie_reviews SET movie_id = "${movie_id}", reviewer_name ="${reviewer_name}",
                     rating = "${rating}", review_comments = "${review_comments}" WHERE id = "${reviewId}"`;

        connection.query(query, (err, results) => {
            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Review not found.'
                });
            }

            if (err) {
                console.error('Error querying database:', err);
                return res.status(501).json([{
                    "Error": err.sqlMessage
                }]);
            }

            return res.json({
                success: true,
                message: 'Review updated successfully.'
            });
        });
    } catch (error) {
        console.error('Error updating movie review:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

/**
 * Handles deleting an existing movie review.
 * Responds with a success message or an error if the review is not found.
 */
let handleDeleteReview = async (req, res) => {
    const reviewId = req.params.id;

    try {
        // Query to delete a movie review
        let query = `DELETE FROM movie_reviews WHERE id = ${reviewId}`;

        connection.query(query, (err, results) => {
            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Review not found.'
                });
            }

            if (err) {
                console.error('Error querying database:', err);
                return res.status(501).json([{
                    "Error": err.sqlMessage
                }]);
            }

            return res.json({
                success: true,
                message: 'Review deleted successfully.'
            });
        });
    } catch (error) {
        console.error('Error deleting movie review:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

module.exports = {
    handleAllReview,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview
};
