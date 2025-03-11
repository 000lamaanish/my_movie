import React from "react";
import MovieCard from '../component/Moviecard'
import "../css/Home.css";

const Favorites = ({ favorites, handleFavoriteToggle }) => {
    return (
        <div>
            <h2>Your Favorite Movies</h2>
            <div className="movies-grid">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} handleFavoriteToggle={handleFavoriteToggle} />
                    ))
                ) : (
                    <p>No favorite movies yet.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
