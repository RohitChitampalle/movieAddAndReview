import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Import the useNavigate hook
    const [movieDetails, setMovieDetails] = useState([]);
    const [reviewDetails, setReviewDetails] = useState([]);
    const [newReview, setNewReview] = useState({ reviewer_name: '', review_comments: '' });
    const [editingReview, setEditingReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch movie details
        axios.get(`${process.env.REACT_APP_BASEURLMOVIE}/${id}`)
            .then(response => {
                setMovieDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            });

        // Fetch review details
        axios.get(`${process.env.REACT_APP_BASEURLMOVIEREVIEW}/${id}`)
            .then(response => {
                setReviewDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching review details:', error);
            });
    }, [id]);

    const handleAddReview = async () => {
        try {
            let { review_comments, reviewer_name } = newReview;
            let formData = new FormData();
            formData.append("review_comments", review_comments);
            formData.append("reviewer_name", reviewer_name);

            if (editingReview) {
                const response = await axios.put(`${process.env.REACT_APP_BASEURLMOVIEREVIEW}/update/${editingReview.movie_id}`, formData);
                const updatedReviews = reviewDetails.map(review =>
                    review.id === editingReview.id ? response.data : review
                );
                setReviewDetails(updatedReviews);
                setEditingReview(null);
            } else {
                const response = await axios.post(`${process.env.REACT_APP_BASEURLMOVIEREVIEW}/add`, formData);
                setReviewDetails([...reviewDetails, response.data]);
            }

            setNewReview({ reviewer_name: '', review_comments: '' });
        } catch (error) {
            console.error('Error adding/editing review:', error);
        }
    };

    const handleEditReview = (review) => {
        setNewReview({ reviewer_name: review.reviewer_name, review_comments: review.review_comments });
        setEditingReview(review);
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASEURLMOVIEREVIEW}/delete/${reviewId}`);
            setReviewDetails(reviewDetails.filter(review => review.id !== reviewId));

            if (editingReview && editingReview.id === reviewId) {
                setEditingReview(null);
                setNewReview({ reviewer_name: '', review_comments: '' });
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {/* Back button */}
                    <button className="btn btn-primary mb-3" onClick={() => navigate('/')}>
                        Back to Home
                    </button>

                    {/* Movie details */}
                    {movieDetails.map((movie, index) => (
                        <div key={index} className="card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Movie Name: {movie.movie_name}</h2>
                                <p className="card-text">Release Date: {movie.release_date}</p>
                                <p className="card-text">Rating: {movie.average_rating}</p>
                            </div>
                        </div>
                    ))}

                    {/* Review details */}
                    {reviewDetails.map((reviewData, index) => (
                        <div key={index} className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title">{reviewData.reviewer_name}</h3>
                                <p className="card-text">{reviewData.review_comments}</p>
                                <button
                                    className="btn btn-warning mr-2"
                                    onClick={() => handleEditReview(reviewData)}
                                >
                                    Edit Review
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteReview(reviewData.id)}
                                >
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add/edit review form */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">
                                {editingReview ? 'Edit Review' : 'Add a Review'}
                            </h3>
                            <div className="form-group">
                                <label htmlFor="reviewerName">Reviewer Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reviewerName"
                                    value={newReview.reviewer_name}
                                    onChange={(e) => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewComments">Review Comments:</label>
                                <textarea
                                    className="form-control"
                                    id="reviewComments"
                                    rows="3"
                                    value={newReview.review_comments}
                                    onChange={(e) => setNewReview({ ...newReview, review_comments: e.target.value })}
                                ></textarea>
                            </div>
                            <button className="btn btn-primary" onClick={handleAddReview}>
                                {editingReview ? 'Update Review' : 'Add Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
