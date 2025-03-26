import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

console.log('API URL:', BASE_URL);
console.log('API Key:', API_KEY);

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        if (!id) {
            setError('Invalid movie ID');
            setLoading(false);
            return;
        }

        const fetchMovieDetails = async () => {
            const apiUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
            try {
                const response = await axios.get(apiUrl);
                setMovieDetails(response.data);
            } catch (err) {
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchSimilarMovies(id);
        }
    }, [id]);

    const fetchSimilarMovies = async (movieId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
            );
            console.log("Similar Movies Response: ", response.data); // Debugging API response
            if (response.data.results.length > 0) {
                setSimilarMovies(response.data.results.slice(0, 5)); // Get top 5 similar movies
            } else {
                setSimilarMovies([]); // Set empty array if no similar movies are found
            }
        } catch (error) {
            console.error("Error fetching similar movies:", error);
            setError('Failed to fetch similar movies');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white text-lg">Loading movie details...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <nav className="w-full bg-gray-800 p-4 shadow-lg fixed top-0 left-0 flex justify-center md:justify-between items-center">
                <h1 className="text-xl font-bold">Movie Info</h1>
            </nav>
            <div className="mt-16 max-w-4xl w-full flex flex-col md:flex-row gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
                />
                <div className="flex flex-col justify-center md:w-2/3">
                    <h1 className="text-3xl font-bold text-center mb-4">{movieDetails.title}</h1>
                    <p className="text-gray-300 mb-4">{movieDetails.overview}</p>
                    <p className="text-lg"><strong>Release Date:</strong> {movieDetails.release_date}</p>
                    <p className="text-lg"><strong>Rating:</strong> {movieDetails.vote_average} / 10</p>
                </div>
            </div>

            {/* Render similar movies only if we have data */}
            {similarMovies.length > 0 ? (
                <div>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Similar Movies</h2>
                    <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
                        {similarMovies.map((movie) => (
                            <div key={movie.id} style={{ textAlign: "center" }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ borderRadius: "8px" }}
                                />
                                <p>{movie.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-lg text-gray-400">No similar movies found.</div>
            )}
        </div>
    );
};

export default MovieDetailPage;
