const connection = require("../model/index");

// Get list of all movies
let handleGetAllMovies = async (req, res) => {
    try {
        let dataNotFound = [{
            "message": "Data Not present!"
        }];

        // Query to fetch all movies
        let query = 'SELECT * FROM details_of_movies';

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
        console.error('Error fetching movies:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            "message": error.sqlMessage
        });
    }
}

// Add new movie
let handleAddMovie = async (req, res) => {
    const {
        movieName,
        releaseDate,
        averageRating
    } = req.body;

    try {
        // Insert new movie into details_of_movies table
        let query = `INSERT INTO details_of_movies (movie_name, release_date, average_rating) VALUES("${movieName}", "${releaseDate}", "${averageRating}")`;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(501).json([{
                    "Error": err.sqlMessage
                }]);
            }

            return res.json({
                id: results.insertId,
                message: 'Movie added successfully'
            });
        });
    } catch (error) {
        console.error('Error adding new movie:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

// Get specific movie data by ID
let handleMovieSpecificData = async (req, res) => {
    const movieId = req.params.id;

    try {
        // Query to fetch a specific movie by ID
        let query = `SELECT * FROM details_of_movies WHERE id =${movieId}`;
        connection.query(query, (err, results) => {
            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Movie not found.'
                });
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
        console.error('Error fetching a movie:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

// Update movie
let handleMovieUpdate = async (req, res) => {
    const movieId = req.params.id;
    const {
        movieName,
        releaseDate,
        averageRating
    } = req.body;

    try {
        // Update movie details in details_of_movies table
        let query = `UPDATE details_of_movies SET movie_name = "${movieName}", release_date ="${releaseDate}", average_rating = "${averageRating}" WHERE id =${movieId}`;
        connection.query(query, (err, results) => {
            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Movie not found.'
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
                message: 'Movie updated successfully.'
            });
        });
    } catch (error) {
        console.error('Error updating a movie:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

// Delete movie
let handleDeleteMovie = async (req, res) => {
    const movieId = req.params.id;

    try {
        // Delete movie from details_of_movies table
        let query = `DELETE FROM details_of_movies WHERE id = ${movieId}`;
        connection.query(query, (err, results) => {
            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Movie not found.'
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
                message: 'Movie deleted successfully.'
            });
        });
    } catch (error) {
        console.error('Error deleting a movie:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    handleGetAllMovies,
    handleAddMovie,
    handleMovieUpdate,
    handleDeleteMovie,
    handleMovieSpecificData
};
