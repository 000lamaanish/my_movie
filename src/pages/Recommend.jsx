import React, { useState } from 'react';
import axios from 'axios';
import '../css/Recommend.css'

const TMDB_API_KEY = "b0f44254786d6ba00216937a2260e18f";
const BASE_URL = "https://api.themoviedb.org/3"


function MovieRecommendations() {
    const [movie, setMovie] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const fetchRecommendations = async () => {
        if (!movie) {
            setError('Please enter a movie name');
            return;
        }

        try {
            // Fetch recommendations from Flask API
            const response = await axios.get(`http://127.0.0.1:5000/recommend`, {
                params: { movie },
            });

            if (response.data.error) {
                setError(response.data.error);
                setRecommendations([]);
            } else {
                setError('');
                fetchMoviePosters(response.data.recommended_movies);
            }
        } catch (err) {
            setError('Failed to fetch data. Make sure the Flask server is running.');
        }
    };

    const fetchMoviePosters = async (movies) => {
        const movieData = await Promise.all(
            movies.map(async (movieTitle) => {
                try {
                    const tmdbResponse = await axios.get(
                        `https://api.themoviedb.org/3/search/movie`,
                        {
                            params: {
                                api_key: TMDB_API_KEY,
                                query: movieTitle,
                            },
                        }
                    );

                    const movieDetails = tmdbResponse.data.results[0]; // Get the first result
                    return {
                        title: movieTitle,
                        poster: movieDetails?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image",
                    };
                } catch (error) {
                    return { title: movieTitle, poster: 'https://via.placeholder.com/500x750?text=No+Image' };
                }
            })
        );

        setRecommendations(movieData);
    };

    return (
        <div className="container">
            <h1 className='h1'> Movie Recommendation </h1>
            <input
                className='input'
                type="text"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Enter a movie name..."
            />
            <button className='btns' onClick={fetchRecommendations}>Get Recommendations</button>

            {error && <p className="error">{error}</p>}

            <div className="movie-grid">
                {recommendations.map((rec, index) => (
                    <>
                        <div key={index} className="movie-card">
                            <img src={rec.poster} alt={rec.title} />
                            <p>{rec.title}</p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}
export default MovieRecommendations;
