import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './m.css'
const MovieDetailPage = () => {
    const { id } = useParams();
    console.log('Movie ID:', id);

    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('Invalid movie ID');
            setLoading(false);
            return;
        }

        const fetchMovieDetails = async () => {
            const apiKey = "b0f44254786d6ba00216937a2260e18f";
            const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

            try {
                const response = await axios.get(apiUrl);
                setMovieDetails(response.data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div>Loading movie details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="movie-detail">
            <h1>{movieDetails.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="movie-poster"
            />
            <p>{movieDetails.overview}</p>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Rating:</strong> {movieDetails.vote_average} / 10</p>
        </div>
    );
};

export default MovieDetailPage;
