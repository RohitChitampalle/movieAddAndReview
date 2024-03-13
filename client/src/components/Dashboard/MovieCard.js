import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieCard = ({ movie, onDelete }) => {
    const handleDelete = () => {
        // Pass the movie ID to the onDelete function
        onDelete(movie.id);
    };

    return (
        <Card style={{ width: '18rem', border: '2px solid #2D3E4F', backgroundColor: '#F2F2F2', color: '#2D3E4F' }}>
            <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
            <Card.Body>
                <Card.Title>{movie.movie_name}</Card.Title>
                <Card.Text>
                    <strong>Release Date:</strong> {movie.release_date}
                </Card.Text>
                <Card.Text>
                    <strong>Average Rating:</strong> {movie.average_rating}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;
