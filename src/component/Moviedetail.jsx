import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
    const { id } = useParams();
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
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

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
        </div>
    );
};

export default MovieDetailPage;
