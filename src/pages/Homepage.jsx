import React, { useState, useEffect } from "react";
import Moviecard from "../component/Moviecard";
import "../css/Home.css";
import { searchMovies, Getpopularmovie } from "../component/Api";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";

const Homepage = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const LoadPopularMovies = async () => {
            try {
                const popularMovies = await Getpopularmovie();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        LoadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        try {
            setLoading(true);
            setError(null);
            const results = await searchMovies(search);
            setMovies(results);
        } catch (err) {
            setError("Failed to fetch search results...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="anish">

                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {loading && <p className="loading">Loading movies...</p>}
                {error && <p className="error">{error}</p>}
                <div className="rec">
                    <div className="popular">
                        <p>Popular Movies</p>
                    </div>

                    <div className="movies-grid">
                        {movies.length > 0 ? (
                            movies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
                        ) : (
                            !loading && <p>No movies found.</p>
                        )}
                    </div>
                </div>
                <div className="rec">
                    <h1 className="recomm">Want any recommendation</h1>
                    <div>
                        <Link to="/recommend">
                            <button className="button">recommend</button>
                        </Link>
                    </div>

                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Homepage;
