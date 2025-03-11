import React, { useState } from "react";
import '../css/Recommend.css'

export default function MovieRecommender() {
    const [movieName, setMovieName] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = "b0f44254786d6ba00216937a2260e18f";

    const getRecommendations = async () => {
        if (!movieName) return;

        setLoading(true);
        setError(null);

        try {
            // Step 1: Search for the movie by name to get its ID
            const searchResponse = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}&language=en-US&page=1`
            );
            const searchData = await searchResponse.json();

            if (searchData.results.length === 0) {
                setError("Movie not found.");
                setLoading(false);
                return;
            }

            const movieId = searchData.results[0].id; // Get the first movie from the search result

            // Step 2: Fetch recommendations using the movie ID
            const recommendationsResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
            );
            const recommendationsData = await recommendationsResponse.json();

            if (recommendationsData.results && recommendationsData.results.length > 0) {
                setRecommendations(recommendationsData.results);
            } else {
                setError("No recommendations found.");
            }
        } catch (err) {
            setError("Error fetching recommendations: " + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="movie-recommender" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <h1></h1>
            <input
                type="text"
                placeholder="Enter a movie name..."
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                className="input"
            />
            <button onClick={getRecommendations} disabled={loading} className="button">
                {loading ? "Loading..." : "Get Recommendations"}
            </button>

            {error && <div className="error">{error}</div>}

            <div className="recommendations-list">
                {recommendations.length > 0 && (
                    <ul className="recommendations-grid">
                        {recommendations.map((movie) => (
                            <li key={movie.id} className="recommendation-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p className="movie-overview">{movie.overview.slice(0, 100)}...</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
