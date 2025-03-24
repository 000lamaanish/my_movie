import React, { useState } from 'react';
import axios from 'axios';

const TMDB_API_KEY = "b0f44254786d6ba00216937a2260e18f";
const BASE_URL = "https://api.themoviedb.org/3";

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
                        `${BASE_URL}/search/movie`,
                        {
                            params: {
                                api_key: TMDB_API_KEY,
                                query: movieTitle,
                            },
                        }
                    );

                    const movieDetails = tmdbResponse.data.results[0];
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
        <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
            <h1 className='text-3xl font-bold mb-6'>Movie Recommendation</h1>
            <div className="flex gap-2 w-full max-w-md">
                <input
                    className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type="text"
                    value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    placeholder="Enter a movie name..."
                />
                <button
                    className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300'
                    onClick={fetchRecommendations}
                >
                    Get Recommendations
                </button>
            </div>
            {error && <p className="mt-4 text-red-400">{error}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                {recommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center">
                        <img className="w-full h-72 object-cover" src={rec.poster} alt={rec.title} />
                        <p className="p-3 text-sm font-medium">{rec.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieRecommendations;
