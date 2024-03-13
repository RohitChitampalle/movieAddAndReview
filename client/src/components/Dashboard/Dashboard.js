import React, { useEffect, useState } from 'react';
import { Card, Form, Container, Row, Col, Spinner, Modal, Button } from 'react-bootstrap';
import MovieCard from './MovieCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // State to track loading status
    useEffect(() => {
        // Fetch movies from your API
        axios.get(`${process.env.REACT_APP_BASEURLMOVIE}/list`)
            .then(response => {
                setMovies(response.data);
            

                  setLoading(false);
             // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    // Filter movies based on the search term
    const filteredMovies = movies.filter(movie =>
        movie.movie_name && movie.movie_name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    console.log(movies)
    return (
        <Container fluid>
            <h2 className="mt-3 mb-4">Movies Dashboard</h2>
            <Form>
                <Form.Group controlId="searchBar">
                    <Form.Control
                        type="text"
                        placeholder="Search by movie name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='m-2'
                    />
                </Form.Group>
            </Form>

            {loading ? ( // Display spinner while loading
                <Spinner
                    animation="border"
                    role="status"
                    className="mt-5 d-flex justify-content-center align-items-center"
                    style={{ height: '15rem', width: '15rem', margin: 'auto' }}
                >
                    <span className="sr-only"></span>
                </Spinner>

            ) : (
                <Row>
                    {searchTerm !== '' ? (
                        // Render filtered movies if search term is present
                        filteredMovies.map(movie => (
                            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                {/* Use Link to navigate to the movie details page */}
                                <Link to={`/movie/${movie.id}/review`}>
                                    <MovieCard movie={movie} />
                                </Link>
                            </Col>
                        ))
                    ) : (
                        // Render all movies if no search term
                                movies.map(movie => (
                                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                        {/* Use Link to navigate to the movie details page */}
                                        <Link to={`/movie/${movie.id}/review`}>
                                            <MovieCard movie={movie} />
                                        </Link>
                                    </Col>
                                ))
                    )}
                </Row>
            )}
        </Container>
    );
};

export default Dashboard;
