// MovieList.js
import React, {
    useEffect,
    useState
} from 'react';

const Movie = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies from API and set the state
    }, []);

    return ( <div>
        <h2> Movies </h2> {
            /* Display movies using Bootstrap */ } </div>
    );
};

export default Movie;
