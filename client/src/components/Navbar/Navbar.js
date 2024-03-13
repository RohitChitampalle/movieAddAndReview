import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';


const MyNavbar = () => {
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [newMovieData, setNewMovieData] = useState({
        movieName: '',
        releaseDate: new Date()
    });
    const [newReviewData, setNewReviewData] = useState({
        reviewText: '',
        selectedMovie: null,
        yourName: '', // new input for your name
        rating: 0,    // new input for rating
    });
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies from your API
        axios.get(`${process.env.REACT_APP_BASEURLMOVIE}/list`)
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const handleAddMovieModalClose = () => {
        setShowAddMovieModal(false);
        setNewMovieData({ movieName: '', releaseDate: new Date() });
    };

    const handleAddMovieModalShow = () => setShowAddMovieModal(true);

    const handleAddReviewModalClose = () => {
        setShowAddReviewModal(false);
        setNewReviewData({ reviewText: '', selectedMovie: null });
    };

    const handleAddReviewModalShow = () => setShowAddReviewModal(true);


    const handleAddNewMovie = async () => {
        try {
            const formData = new FormData();
            formData.append('movieName', newMovieData.movieName);

            // Format the date using date-fns before appending it to the FormData
            const formattedDate = format(newMovieData.releaseDate, 'yyyy-MM-dd');
            console.log("Formatted date",formattedDate)
            formData.append('releaseDate', formattedDate);

   

            const response = await axios.post(`${process.env.REACT_APP_BASEURLMOVIE}/add`, formData);

            console.log('New Movie Added:', response.data);
            handleAddMovieModalClose();
        } catch (error) {
            console.error('Error adding new movie:', error);
        } finally {

        }
    };

    const handleAddNewReview = async () => {
        try {
            const formData = new FormData();
            formData.append('review_comments', newReviewData.reviewText);
            formData.append('movie_id', newReviewData.selectedMovie.id);
            formData.append('reviewer_name', newReviewData.yourName);
            formData.append('rating', newReviewData.rating);

            const response = await axios.post(`${process.env.REACT_APP_BASEURLMOVIEREVIEW}/add`, formData);

            console.log('New Review Added:', response.data);
            handleAddReviewModalClose();
        } catch (error) {
            console.error('Error adding new review:', error);
        }
    };


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">MovieCritic</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Button variant="primary" className="me-2" onClick={handleAddMovieModalShow}>
                            Add New Movie
                        </Button>
                        <Button variant="success" onClick={handleAddReviewModalShow}>
                            Add New Review
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <Modal show={showAddMovieModal} onHide={handleAddMovieModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="movieName">
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie name"
                                value={newMovieData.movieName}
                                onChange={(e) => setNewMovieData({ ...newMovieData, movieName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="releaseDate">
                            <Form.Label>Release Date</Form.Label>
                            <DatePicker
                                selected={newMovieData.releaseDate}
                                onChange={(date) => setNewMovieData({ ...newMovieData, releaseDate: date })}
                                dateFormat="yyyy-MM-dd"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddMovieModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNewMovie}>
                        Save Movie
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddReviewModal} onHide={handleAddReviewModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="movieDropdown">
                            <Form.Label>Select Movie</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {newReviewData.selectedMovie ? newReviewData.selectedMovie.movie_name : 'Select a Movie'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {movies.map(movie => (
                                        <Dropdown.Item
                                            key={movie.id}
                                            onClick={() => setNewReviewData({ ...newReviewData, selectedMovie: movie })}
                                        >
                                            {movie.movie_name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <Form.Group controlId="yourName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={newReviewData.yourName}
                                onChange={(e) => setNewReviewData({ ...newReviewData, yourName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter your rating"
                                value={newReviewData.rating}
                                onChange={(e) => setNewReviewData({ ...newReviewData, rating: parseInt(e.target.value, 10) })}
                            />
                        </Form.Group>
                        <Form.Group controlId="reviewText">
                            <Form.Label>Review Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your review"
                                value={newReviewData.reviewText}
                                onChange={(e) => setNewReviewData({ ...newReviewData, reviewText: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddReviewModalClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleAddNewReview}>
                        Save Review
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
};

export default MyNavbar;
