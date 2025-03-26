import React, { useState } from 'react';
import axios from 'axios';

const TMDB_API_KEY = "b0f44254786d6ba00216937a2260e18f";

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
            const response = await axios.get(`http://127.0.0.1:5000/recommend`, { params: { movie } });

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
                    const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                        params: { api_key: TMDB_API_KEY, query: movieTitle },
                    });

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Movie Recommendations</h1>
            <input
                className="w-96 p-3 border border-gray-600 rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
                type="text"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Enter a movie name..."
            />
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                onClick={fetchRecommendations}
            >
                Get Recommendations
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {recommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        <img className="w-48 h-72 object-cover rounded-lg" src={rec.poster} alt={rec.title} />
                        <p className="mt-2 text-center">{rec.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieRecommendations;
